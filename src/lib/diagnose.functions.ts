import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const inputSchema = z.object({
  imageType: z.enum(["skin", "xray", "mri", "ct", "other"]),
  symptoms: z.string().max(2000).optional().default(""),
  imageBase64: z.string().max(8_000_000).optional(),
  language: z.string().max(8).default("en"),
});

const LANG_NAMES: Record<string, string> = {
  en: "English", ar: "Arabic", so: "Somali", am: "Amharic",
  es: "Spanish", fr: "French", zh: "Chinese", hi: "Hindi", pt: "Portuguese", ru: "Russian",
};

export const runDiagnosis = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    // Quota check
    const { data: quota, error: quotaErr } = await supabase.rpc("consume_consult", { p_user: userId });
    if (quotaErr) {
      return { ok: false as const, error: quotaErr.message };
    }
    const q = quota as { allowed: boolean; reason?: string; remaining?: number };
    if (!q.allowed) {
      return { ok: false as const, error: q.reason ?? "not_allowed", quota: q };
    }

    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "AI is not configured. Add LOVABLE_API_KEY." };
    }

    const langName = LANG_NAMES[data.language] ?? "English";
    const system = [
      `You are AZDoctor, an educational medical information assistant.`,
      `Respond ONLY in ${langName}.`,
      `You are NOT a doctor. Always remind the user this is educational only and to consult a licensed physician.`,
      `Structure your response with: 1) Observations 2) Possible considerations (educational) 3) Self-care tips 4) When to seek urgent care.`,
      `Be concise, kind, and avoid definitive diagnoses.`,
    ].join(" ");

    const userParts: Array<Record<string, unknown>> = [];
    userParts.push({
      type: "text",
      text: `Image category: ${data.imageType.toUpperCase()}. User notes: ${data.symptoms || "(none)"}.`,
    });
    if (data.imageBase64) {
      userParts.push({
        type: "image_url",
        image_url: { url: data.imageBase64 },
      });
    }

    try {
      const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: system },
            { role: "user", content: userParts },
          ],
        }),
      });

      if (!r.ok) {
        if (r.status === 429) return { ok: false as const, error: "Rate limit reached. Try again shortly." };
        if (r.status === 402) return { ok: false as const, error: "AI credits exhausted. Top up in Settings." };
        const txt = await r.text();
        console.error("AI gateway error", r.status, txt);
        return { ok: false as const, error: "AI service error." };
      }

      const json = await r.json();
      const content: string = json.choices?.[0]?.message?.content ?? "No response.";

      await supabase.from("consultations").insert({
        user_id: userId,
        image_type: data.imageType,
        symptoms: data.symptoms || null,
        ai_response: content,
        has_image: Boolean(data.imageBase64),
      });

      return { ok: true as const, content, quota: q };
    } catch (e) {
      console.error(e);
      return { ok: false as const, error: e instanceof Error ? e.message : "Unknown error" };
    }
  });
