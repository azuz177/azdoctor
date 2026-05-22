import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { useMemo, useState } from "react";
import { pickRound, type GameItem } from "@/lib/game-data";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/game")({ component: Game });

function Game() {
  const { t, dir } = useI18n();
  const [score, setScore] = useState(0);
  const [seed, setSeed] = useState(0);
  const [feedback, setFeedback] = useState<"ok" | "no" | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const round = useMemo(() => pickRound(4), [seed]);

  const guess = (item: GameItem, option: string) => {
    setSelectedOption(option);
    if (option === round.answer.term) {
      setScore((s) => s + 10);
      setFeedback("ok");
      setTimeout(() => { setFeedback(null); setSelectedOption(null); setSeed((s) => s + 1); }, 1200);
    } else {
      setFeedback("no");
      setTimeout(() => { setFeedback(null); setSelectedOption(null); }, 800);
    }
  };

  return (
    <div dir={dir} className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
        <div className="flex items-end justify-between mb-2">
          <div>
            <h1 className="font-display text-4xl font-semibold">{t("game.title")}</h1>
            <p className="text-muted-foreground mt-1">{t("game.sub")}</p>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase text-muted-foreground">{t("game.score")}</div>
            <div className="font-display text-3xl">{score}</div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={seed} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-8 text-center">
            <motion.div
              className="inline-flex flex-col items-center rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground px-10 py-8 shadow-glow"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-7xl mb-4">{round.answer.emoji}</span>
              <div className="text-xs uppercase opacity-70 tracking-wider">What is this?</div>
              <div className="text-sm opacity-90 mt-2 max-w-xs">{round.answer.hint}</div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10">
          <p className="text-center text-sm text-muted-foreground mb-4">Pick the correct word:</p>
          <div className="grid grid-cols-2 gap-4">
            {round.answer.wordOptions.map((option, idx) => (
              <motion.button
                key={`${seed}-${option}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => guess(round.answer, option)}
                disabled={feedback !== null}
                className={`rounded-2xl px-6 py-5 border-2 text-lg font-medium transition-all ${
                  selectedOption === option
                    ? feedback === "ok"
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-destructive text-white border-destructive"
                    : "bg-card border-border hover:border-primary hover:bg-primary/5"
                }`}
                aria-label={option}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>

        {feedback && (
          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-6 text-center text-3xl font-bold ${feedback === "ok" ? "text-green-500" : "text-destructive"}`}
          >
            {feedback === "ok" ? `🎉 ${t("game.correct")}` : `❌ ${t("game.wrong")}`}
          </motion.p>
        )}

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => { setSelectedOption(null); setFeedback(null); setSeed((s) => s + 1); }}>{t("game.next")}</Button>
        </div>

        <div className="mt-10"><AdSlot /></div>
      </main>
      <Footer />
    </div>
  );
}
