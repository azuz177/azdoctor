import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto">
          AZDoctor provides educational information only and is not a substitute for professional medical advice.
          Always consult with a qualified healthcare provider.
        </p>
        <p className="text-xs text-muted-foreground text-center mt-4">
          © {new Date().getFullYear()} AZDoctor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
