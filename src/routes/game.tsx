import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { useMemo, useState } from "react";
import { pickRound, type GameItem } from "@/lib/game-data";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/game")({ component: Game });

function Game() {
  const { t, dir } = useI18n();
  const [score, setScore] = useState(0);
  const [seed, setSeed] = useState(0);
  const [feedback, setFeedback] = useState<"ok" | "no" | null>(null);
  const round = useMemo(() => pickRound(6), [seed]);

  const guess = (item: GameItem) => {
    if (item.term === round.answer.term) {
      setScore((s) => s + 10);
      setFeedback("ok");
      setTimeout(() => { setFeedback(null); setSeed((s) => s + 1); }, 700);
    } else {
      setFeedback("no");
      setTimeout(() => setFeedback(null), 600);
    }
  };

  return (
    <div dir={dir} className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
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

        <motion.div key={seed} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-center">
          <div className="inline-block rounded-2xl bg-primary text-primary-foreground px-8 py-6 shadow-glow">
            <div className="text-xs uppercase opacity-70">Term</div>
            <div className="font-display text-3xl mt-1">{round.answer.term}</div>
            <div className="text-sm opacity-80 mt-1">{round.answer.hint}</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
          {round.items.map((it) => (
            <motion.button
              key={it.term}
              whileTap={{ scale: 0.95 }}
              onClick={() => guess(it)}
              className="aspect-square rounded-2xl bg-card border border-border shadow-soft text-6xl grid place-items-center hover:border-primary transition-colors"
              aria-label={it.term}
            >
              {it.emoji}
            </motion.button>
          ))}
        </div>

        {feedback && (
          <p className={`mt-4 text-center font-medium ${feedback === "ok" ? "text-primary" : "text-destructive"}`}>
            {feedback === "ok" ? t("game.correct") : t("game.wrong")}
          </p>
        )}

        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => setSeed((s) => s + 1)}>{t("game.next")}</Button>
        </div>

        <div className="mt-10"><AdSlot /></div>
      </main>
      <Footer />
    </div>
  );
}
