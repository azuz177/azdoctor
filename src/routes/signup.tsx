import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({ component: Signup });

function Signup() {
  const { t, dir } = useI18n();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { emailRedirectTo: window.location.origin, data: { display_name: name } },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Check your email to confirm your account");
    nav({ to: "/login" });
  };

  const google = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/diagnose" });
    if (r.error) toast.error(r.error.message);
  };

  return (
    <div dir={dir} className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 grid place-items-center px-4 py-12">
        <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-soft">
          <h1 className="font-display text-2xl">{t("auth.signup")}</h1>
          <Button onClick={google} variant="outline" className="w-full mt-6">{t("auth.google")}</Button>
          <div className="my-5 text-center text-xs text-muted-foreground">— or —</div>
          <form onSubmit={onSubmit} className="space-y-3">
            <div><Label>{t("auth.name")}</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div><Label>{t("auth.email")}</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div><Label>{t("auth.password")}</Label><Input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            <Button type="submit" disabled={loading} className="w-full">{loading ? "…" : t("auth.signup")}</Button>
          </form>
          <p className="mt-4 text-xs text-center text-muted-foreground">
            {t("auth.have")} <Link to="/login" className="text-primary underline">{t("auth.signin")}</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
