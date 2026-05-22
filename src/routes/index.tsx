import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Camera, Globe2, Gamepad2, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({ component: Index });

function AnimatedHeroApple() {
  return (
    <motion.div
      animate={{ y: [0, -15, 0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      <motion.div
        className="relative w-80 h-80 md:w-96 md:h-96 mx-auto"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-300 via-green-500 to-green-700"
          style={{ borderRadius: "50% 50% 45% 45% / 60% 60% 40% 40%" }}
          animate={{
            boxShadow: [
              "0 20px 80px rgba(34, 197, 94, 0.5), 0 10px 30px rgba(34, 197, 94, 0.3)",
              "0 30px 100px rgba(34, 197, 94, 0.7), 0 15px 40px rgba(34, 197, 94, 0.4)",
              "0 20px 80px rgba(34, 197, 94, 0.5), 0 10px 30px rgba(34, 197, 94, 0.3)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="absolute top-8 left-10 w-16 h-16 bg-white/40 rounded-full" />
          <div className="absolute top-10 left-12 w-8 h-8 bg-white/80 rounded-full" />
          <div className="absolute top-16 right-14 w-10 h-8 bg-white/20 rounded-full rotate-45" />
        </motion.div>

        <motion.div
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-14 bg-gradient-to-br from-green-400 to-green-600"
          style={{ borderRadius: "0% 100% 0% 100%" }}
          animate={{ rotate: [-8, 12, -8] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
          <div className="flex gap-6 mb-2">
            <motion.div
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
            >
              <div className="w-14 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner border-2 border-green-100">
                <div className="w-9 h-9 bg-emerald-600 rounded-full relative">
                  <div className="absolute top-1.5 left-2 w-3.5 h-3.5 bg-emerald-900 rounded-full" />
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-white rounded-full" />
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3, delay: 0.1 }}
            >
              <div className="w-14 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner border-2 border-green-100">
                <div className="w-9 h-9 bg-emerald-600 rounded-full relative">
                  <div className="absolute top-1.5 left-2 w-3.5 h-3.5 bg-emerald-900 rounded-full" />
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-white rounded-full" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="absolute top-32 left-10 w-6 h-5 bg-pink-400/60 rounded-full blur-md" />
          <div className="absolute top-32 right-10 w-6 h-5 bg-pink-400/60 rounded-full blur-md" />

          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-12 h-6 bg-pink-400 rounded-full border-2 border-pink-500 mt-2 overflow-hidden">
              <div className="w-full h-3 bg-pink-300 rounded-t-full" />
            </div>
          </motion.div>
        </div>

        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-7 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full" />
      </motion.div>
    </motion.div>
  );
}

function Index() {
  const { t, dir } = useI18n();
  return (
    <div dir={dir} className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative bg-hero overflow-hidden">
          <div className="container mx-auto px-4 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {t("hero.tag")}
              </span>
              <h1 className="font-display text-5xl lg:text-7xl font-semibold mt-5 text-balance leading-[1.05]">
                {t("hero.title")}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl text-balance">
                {t("hero.sub")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/diagnose">{t("hero.cta")} <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link to="/game">{t("hero.cta2")}</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative pointer-events-none"
            >
              <AnimatedHeroApple />
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <h2 className="font-display text-4xl font-semibold text-center mb-12">{t("feat.title")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { i: Camera, t: t("feat.camera.t"), d: t("feat.camera.d") },
              { i: Globe2, t: t("feat.lang.t"), d: t("feat.lang.d") },
              { i: Gamepad2, t: t("feat.game.t"), d: t("feat.game.d") },
              { i: ShieldCheck, t: t("feat.safe.t"), d: t("feat.safe.d") },
            ].map((f, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-2xl bg-card border border-border p-6 shadow-soft"
              >
                <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <f.i className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl mt-4">{f.t}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-20">
          <div className="rounded-3xl bg-primary text-primary-foreground p-10 lg:p-16 text-center shadow-glow">
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-balance">
              Your symptoms, decoded — in your language.
            </h2>
            <p className="mt-4 opacity-80 max-w-xl mx-auto">Start your consultation, or jump into the learning game right now.</p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link to="/pricing">{t("nav.pricing")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/login">{t("nav.signin")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
