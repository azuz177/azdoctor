import { Link } from "@tanstack/react-router";
import { useI18n, LANGUAGES } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { t, dir, lang, setLang } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold text-primary">
          AZDoctor
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            {t("nav.home")}
          </Link>
          <Link to="/diagnose" className="text-sm font-medium hover:text-primary transition-colors">
            {t("nav.diagnose")}
          </Link>
          <Link to="/game" className="text-sm font-medium hover:text-primary transition-colors">
            {t("nav.game")}
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
            {t("nav.pricing")}
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Select value={lang} onValueChange={(v) => setLang(v as typeof lang)}>
            <SelectTrigger className="w-[100px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((l) => (
                <SelectItem key={l.code} value={l.code}>
                  {l.flag} {l.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button asChild variant="ghost" size="sm">
            <Link to="/login">{t("nav.signin")}</Link>
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link to="/" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              {t("nav.home")}
            </Link>
            <Link to="/diagnose" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              {t("nav.diagnose")}
            </Link>
            <Link to="/game" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              {t("nav.game")}
            </Link>
            <Link to="/pricing" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              {t("nav.pricing")}
            </Link>
            <Link to="/login" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              {t("nav.signin")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
