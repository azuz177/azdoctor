import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({ component: Pricing });

function Pricing() {
  const { t, dir } = useI18n();
  const plans = [
    { key: "one", t: t("price.one.t"), p: t("price.one.p"), d: t("price.one.d"), popular: false },
    { key: "month", t: t("price.month.t"), p: t("price.month.p"), d: t("price.month.d"), popular: true },
  ];
  return (
    <div dir={dir} className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="font-display text-5xl text-center font-semibold">{t("price.title")}</h1>
        <div className="grid md:grid-cols-2 gap-5 mt-12 max-w-3xl mx-auto">
          {plans.map((p) => (
            <div key={p.key} className={`relative rounded-2xl border p-7 shadow-soft ${p.popular ? "border-primary bg-card ring-2 ring-primary/30" : "border-border bg-card"}`}>
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">{t("price.popular")}</span>
              )}
              <h3 className="font-display text-xl">{p.t}</h3>
              <div className="mt-3 text-4xl font-display font-semibold">{p.p}</div>
              <p className="text-sm text-muted-foreground mt-3">{p.d}</p>
              <Button asChild className="w-full mt-6"><Link to="/signup">{t("price.cta")}</Link></Button>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="flex gap-2"><Check className="h-4 w-4 text-primary mt-0.5" /> Camera & file upload</li>
                <li className="flex gap-2"><Check className="h-4 w-4 text-primary mt-0.5" /> Multi-language responses</li>
                <li className="flex gap-2"><Check className="h-4 w-4 text-primary mt-0.5" /> History stored securely</li>
              </ul>
            </div>
          ))}
        </div>
        <p className="text-xs text-center text-muted-foreground mt-10 max-w-2xl mx-auto">
          Payments will be enabled once your account is on the Pro workspace.
        </p>
      </main>
      <Footer />
    </div>
  );
}
