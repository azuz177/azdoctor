import { createFileRoute, redirect } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdSlot } from "@/components/AdSlot";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { runDiagnosis } from "@/lib/diagnose.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Loader2, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/diagnose")({
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/login" });
  },
  component: Diagnose,
});

function fileToBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

function Diagnose() {
  const { t, dir, lang } = useI18n();
  const { user } = useAuth();
  const run = useServerFn(runDiagnosis);
  const [imageType, setImageType] = useState<"skin" | "xray" | "mri" | "ct" | "other">("skin");
  const [symptoms, setSymptoms] = useState("");
  const [imageB64, setImageB64] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!symptoms && !imageB64) return toast.error("Add an image or describe symptoms");
    setLoading(true);
    setResult(null);
    try {
      const r = await run({ data: { imageType, symptoms, imageBase64: imageB64 ?? undefined, language: lang } });
      if (!r.ok) toast.error(r.error);
      else setResult(r.content);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir={dir} className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-3xl">
        <h1 className="font-display text-4xl font-semibold">{t("diag.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">Signed in as {user?.email}</p>

        <div className="mt-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-4 text-sm flex gap-3">
          <ShieldAlert className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-amber-900 dark:text-amber-200">{t("disclaimer")}</p>
        </div>

        <div className="mt-6 space-y-5 bg-card border border-border rounded-2xl p-6 shadow-soft">
          <div>
            <Label>{t("diag.type")}</Label>
            <Select value={imageType} onValueChange={(v) => setImageType(v as typeof imageType)}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="skin">Skin condition</SelectItem>
                <SelectItem value="xray">X-Ray</SelectItem>
                <SelectItem value="mri">MRI</SelectItem>
                <SelectItem value="ct">CT scan</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>{t("diag.symptoms")}</Label>
            <Textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} rows={4} className="mt-1.5" placeholder="e.g. itchy red rash on forearm for 3 days…" />
          </div>

          <div>
            <Label>{t("diag.upload")}</Label>
            <label className="mt-1.5 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 px-4 py-8 cursor-pointer hover:border-primary transition-colors">
              <Camera className="h-7 w-7 text-muted-foreground" />
              <span className="mt-2 text-sm text-muted-foreground">{imageB64 ? "Image ready ✓ — tap to replace" : "Take photo or choose file"}</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  if (f.size > 5_000_000) return toast.error("Image must be under 5 MB");
                  setImageB64(await fileToBase64(f));
                }}
              />
            </label>
            {imageB64 && <img src={imageB64} alt="preview" className="mt-3 max-h-48 rounded-lg" />}
          </div>

          <Button onClick={onSubmit} disabled={loading} size="lg" className="w-full">
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> {t("diag.thinking")}</> : t("diag.submit")}
          </Button>
        </div>

        {result && (
          <div className="mt-6 rounded-2xl bg-card border border-border p-6 shadow-soft">
            <h2 className="font-display text-xl mb-3">Analysis</h2>
            <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground">{result}</div>
          </div>
        )}

        <div className="mt-8"><AdSlot /></div>
      </main>
      <Footer />
    </div>
  );
}
