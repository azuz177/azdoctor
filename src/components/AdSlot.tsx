import { useI18n } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";

export function AdSlot() {
  const { t } = useI18n();
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 flex items-center justify-between gap-4 text-sm">
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{t("ad.label")}</div>
        <div className="font-medium">Health tips delivered weekly — partner placement.</div>
      </div>
      <Link to="/pricing" className="text-primary font-medium whitespace-nowrap hover:underline">
        {t("ad.upgrade")} →
      </Link>
    </div>
  );
}
