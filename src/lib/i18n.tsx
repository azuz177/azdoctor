import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ar", name: "العربية", flag: "🇸🇦", rtl: true },
  { code: "so", name: "Soomaali", flag: "🇸🇴" },
  { code: "am", name: "አማርኛ", flag: "🇪🇹" },
  { code: "es", name: "Español", flag: "🇪🇸" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

type Dict = Record<string, string>;

const dictionaries: Record<LangCode, Dict> = {
  en: {
    "nav.home": "Home",
    "nav.diagnose": "Diagnose",
    "nav.game": "Learn & Play",
    "nav.pricing": "Pricing",
    "nav.account": "Account",
    "nav.signin": "Sign in",
    "nav.signout": "Sign out",
    "hero.tag": "AI-powered medical companion",
    "hero.title": "Understand your symptoms in seconds.",
    "hero.sub": "Snap a photo of a rash, X-ray, MRI or CT. Get an instant educational explanation in your language.",
    "hero.cta": "Start a diagnosis",
    "hero.cta2": "Play the learning game",
    "feat.title": "Everything you need to stay informed",
    "feat.camera.t": "Camera diagnosis",
    "feat.camera.d": "Skin, X-ray, MRI, CT and more analyzed by medical AI.",
    "feat.lang.t": "Multilingual",
    "feat.lang.d": "Available in 10+ languages including Arabic, Somali, and Amharic.",
    "feat.game.t": "Learn through play",
    "feat.game.d": "Interactive matching games for medical terms and symptoms.",
    "feat.safe.t": "Private & secure",
    "feat.safe.d": "Your data is encrypted and never shared.",
    "game.title": "Medical Match",
    "game.sub": "Match the symptom to its description.",
    "game.score": "Score",
    "game.next": "Next round",
    "game.correct": "Correct!",
    "game.wrong": "Try again",
    "price.title": "Simple, fair pricing",
    "price.one.t": "One-time",
    "price.one.p": "$10",
    "price.one.d": "Single deep diagnosis",
    "price.month.t": "Monthly",
    "price.month.p": "$15/mo",
    "price.month.d": "5 consults per month",
    "price.popular": "Popular",
    "price.cta": "Get started",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.signin": "Sign in",
    "auth.signup": "Sign up",
    "diag.title": "New Diagnosis",
    "diag.submit": "Analyze",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.diagnose": "التشخيص",
    "nav.game": "تعلّم والعب",
    "nav.pricing": "الأسعار",
    "nav.signin": "تسجيل الدخول",
    "hero.title": "افهم أعراضك في ثوانٍ.",
    "game.title": "مطابقة طبية",
  },
  so: {
    "nav.home": "Bogga hore",
    "nav.diagnose": "Baaritaan",
    "nav.game": "Baro & Ciyaar",
    "hero.title": "Fahan calaamadahaaga ilbiriqsiyo gudahood.",
    "game.title": "Is-waafajin Caafimaad",
  },
  am: {
    "nav.home": "መነሻ",
    "nav.diagnose": "ምርመራ",
    "nav.game": "ተማር እና ተጫወት",
    "hero.title": "ምልክቶችህን በሰከንዶች ተረዳ።",
    "game.title": "የሕክምና ግጥሚያ",
  },
  es: {
    "nav.home": "Inicio",
    "nav.diagnose": "Diagnosticar",
    "nav.game": "Aprender",
    "hero.title": "Entiende tus síntomas en segundos.",
    "game.title": "Match Médico",
  },
};

type Ctx = {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("lang") as LangCode | null) : null;
    if (stored && stored in dictionaries) setLangState(stored);
  }, []);

  const setLang = (l: LangCode) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const isRtl = LANGUAGES.find((l) => l.code === lang)?.rtl ?? false;
  const dir: "ltr" | "rtl" = isRtl ? "rtl" : "ltr";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
  }, [lang, dir]);

  const t = (key: string) => dictionaries[lang]?.[key] ?? dictionaries.en[key] ?? key;

  return <I18nContext.Provider value={{ lang, setLang, t, dir }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n outside provider");
  return ctx;
}
