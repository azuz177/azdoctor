import { Link } from "@tanstack/react-router";
import { useI18n, LANGUAGES, type LangCode } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { Globe } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border">
      <div className="container mx-auto flex items-center justify-between px-4 h-16">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-primary">
          <img src={logo} alt="AZDoctor" className="h-9 w-9 rounded-xl shadow-glow" />
          AZDoctor
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/diagnose" className="hover:text-primary transition-colors">{t("nav.diagnose")}</Link>
          <Link to="/game" className="hover:text-primary transition-colors">{t("nav.game")}</Link>
          <Link to="/pricing" className="hover:text-primary transition-colors">{t("nav.pricing")}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{LANGUAGES.find((l) => l.code === lang)?.flag}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-80 overflow-auto">
              {LANGUAGES.map((l) => (
                <DropdownMenuItem key={l.code} onSelect={() => setLang(l.code as LangCode)}>
                  <span className="mr-2">{l.flag}</span> {l.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {user ? (
            <Button variant="outline" size="sm" onClick={() => signOut()}>{t("nav.signout")}</Button>
          ) : (
            <Button asChild size="sm"><Link to="/login">{t("nav.signin")}</Link></Button>
          )}
        </div>
      </div>
    </header>
  );
}
