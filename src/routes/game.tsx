import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "@/components";
import { useI18n } from "@/lib/i18n";
import { useMemo, useState } from "react";
import { pickRound, type GameItem } from "@/lib/game-data";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/game")({
  component: GamePage,
});

function GamePage() {
  const { t } = useI18n();
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [roundKey, setRoundKey] = useState(0);

  const round = useMemo(() => pickRound(), [roundKey]);
  const { items, answer } = round;

  const handleOptionClick = (option: string) => {
    if (selectedOption) return;
    
    setSelectedOption(option);
    
    if (option === answer.term) {
      setFeedback("correct");
      setScore((s) => s + 1);
    } else {
      setFeedback("wrong");
    }
  };

  const nextRound = () => {
    setFeedback(null);
    setSelectedOption(null);
    setRoundKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{t("game.title")}</h1>
            <p className="text-muted-foreground">{t("game.sub")}</p>
          </div>

          <AdSlot />

          <div className="mt-8 flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              {t("game.score")}: {score}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={roundKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-card border rounded-2xl p-8 text-center"
            >
              <motion.div
                className="text-8xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {answer.emoji}
              </motion.div>

              <p className="text-lg text-muted-foreground mb-8">{answer.hint}</p>

              <div className="grid grid-cols-2 gap-3">
                {items.map((item) => (
                  <Button
                    key={item.term}
                    variant={
                      selectedOption
                        ? item.term === answer.term
                          ? "default"
                          : selectedOption === item.term
                            ? "destructive"
                            : "outline"
                        : "outline"
                    }
                    className={`h-14 text-base font-medium ${
                      selectedOption && item.term === answer.term ? "bg-green-600 hover:bg-green-600" : ""
                    }`}
                    onClick={() => handleOptionClick(item.term)}
                    disabled={!!selectedOption}
                  >
                    {item.term}
                  </Button>
                ))}
              </div>

              {feedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6"
                >
                  <p
                    className={`text-lg font-bold mb-4 ${
                      feedback === "correct" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {feedback === "correct" ? t("game.correct") : t("game.wrong")}
                  </p>
                  <Button onClick={nextRound}>{t("game.next")}</Button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8">
            <AdSlot />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
