import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border mt-24">
      <div className="container mx-auto px-4 py-10 text-sm text-primary/80 space-y-4">
        <p className="text-xs leading-relaxed max-w-3xl">{t("disclaimer")}</p>
        <p className="text-xs">© {new Date().getFullYear()} AZDoctor. {t("footer.rights")}</p>
      </div>
    </footer>
  );
}
