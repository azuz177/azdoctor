import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

function PricingPage() {
  const { t } = useI18n();

  const plans = [
    {
      name: t("price.one.t"),
      price: t("price.one.p"),
      description: t("price.one.d"),
      features: ["Single deep diagnosis", "Image analysis", "Symptom checker", "7-day history"],
      popular: false,
    },
    {
      name: t("price.month.t"),
      price: t("price.month.p"),
      description: t("price.month.d"),
      features: [
        "5 consults per month",
        "Image analysis",
        "Symptom checker",
        "Unlimited history",
        "Priority support",
        "Family sharing",
      ],
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("price.title")}</h1>
          <p className="text-lg text-muted-foreground">
            Choose the plan that works best for you. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border bg-card p-8 ${
                plan.popular ? "border-primary shadow-lg" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    {t("price.popular")}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                <Link to="/signup">{t("price.cta")}</Link>
              </Button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
