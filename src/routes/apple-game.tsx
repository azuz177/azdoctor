import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, Apple, Sparkles } from "lucide-react";

export const Route = createFileRoute("/apple-game")({ component: AppleGame });

const POWER_UPS = [
  { id: "double", name: "Double Click", emoji: "✌️", cost: 50, multiplier: 2, duration: 5000 },
  { id: "autoclick", name: "Auto Clicker", emoji: "🤖", cost: 100, multiplier: 5, duration: 10000 },
  { id: "golden", name: "Golden Apple", emoji: "✨", cost: 200, multiplier: 10, duration: 5000 },
];

function AppleGame() {
  const { t, dir } = useI18n();
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [activePowerUp, setActivePowerUp] = useState<string | null>(null);
  const [showFloating, setShowFloating] = useState<{x: number; y: number; value: number; id: number}[]>([]);
  const [appleScale, setAppleScale] = useState(1);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("apple-highscore") || "0");
    }
    return 0;
  });

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("apple-highscore", score.toString());
    }
  }, [score, highScore]);

  const handleAppleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const points = multiplier;
    
    setScore((s) => s + points);
    setClicks((c) => c + 1);
    setAppleScale(0.9);
    setTimeout(() => setAppleScale(1), 100);

    const newFloat = { x, y, value: points, id: Date.now() };
    setShowFloating((prev) => [...prev, newFloat]);
    setTimeout(() => {
      setShowFloating((prev) => prev.filter((f) => f.id !== newFloat.id));
    }, 1000);
  }, [multiplier]);

  const activatePowerUp = (powerUp: typeof POWER_UPS[0]) => {
    if (score >= powerUp.cost && !activePowerUp) {
      setScore((s) => s - powerUp.cost);
      setActivePowerUp(powerUp.id);
      setMultiplier(powerUp.multiplier);
      setTimeout(() => {
        setActivePowerUp(null);
        setMultiplier(1);
      }, powerUp.duration);
    }
  };

  const isHighScore = score >= 100;

  return (
    <div dir={dir} className="min-h-screen flex flex-col bg-gradient-to-b from-red-50 via-orange-50 to-yellow-50 dark:from-slate-900 dark:via-red-950/20 dark:to-orange-950/20">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white dark:bg-card px-6 py-3 rounded-full shadow-soft border border-red-100 dark:border-red-900/30"
          >
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-muted-foreground text-sm">High Score:</span>
            <span className="font-bold text-lg">{highScore}</span>
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-8 mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Score</div>
            <motion.div
              key={score}
              initial={{ scale: 1.5, color: "#22c55e" }}
              animate={{ scale: 1, color: "inherit" }}
              className="font-display text-6xl font-bold"
            >
              {score}
            </motion.div>
          </motion.div>

          <div className="h-16 w-px bg-border" />

          <div className="text-center">
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Clicks</div>
            <div className="font-display text-6xl font-bold">{clicks}</div>
          </div>

          <div className="h-16 w-px bg-border" />

          <div className="text-center">
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Multiplier</div>
            <motion.div
              animate={{ scale: multiplier > 1 ? [1, 1.3, 1] : 1 }}
              className={`font-display text-6xl font-bold ${multiplier > 1 ? "text-yellow-500" : ""}`}
            >
              x{multiplier}
            </motion.div>
          </div>
        </div>

        <div className="relative flex justify-center mb-10">
          <motion.div
            style={{ scale: appleScale }}
            whileHover={{ scale: 1.05 }}
            onClick={handleAppleClick}
            className="relative cursor-pointer select-none"
          >
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-64 h-64 md:w-80 md:h-80 relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-400 via-red-500 to-red-700"
                style={{ borderRadius: "50% 50% 45% 45% / 60% 60% 40% 40%" }}
                animate={{
                  boxShadow: activePowerUp === "golden"
                    ? [
                        "0 0 60px rgba(255, 215, 0, 0.8)",
                        "0 0 100px rgba(255, 215, 0, 1)",
                        "0 0 60px rgba(255, 215, 0, 0.8)",
                      ]
                    : [
                        "0 20px 60px rgba(239, 68, 68, 0.5)",
                        "0 30px 80px rgba(239, 68, 68, 0.7)",
                        "0 20px 60px rgba(239, 68, 68, 0.5)",
                      ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="absolute top-6 left-8 w-12 h-12 bg-white/40 rounded-full blur-sm" />
              </motion.div>

              <motion.div
                className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-12 bg-gradient-to-br from-green-400 to-green-600"
                style={{ borderRadius: "0% 100% 0% 100%" }}
                animate={{ rotate: [-8, 12, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                <div className="flex gap-5 mb-3">
                  <motion.div
                    animate={{ scaleY: [1, 0.1, 1] }}
                    transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <div className="w-10 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
                      <div className="w-6 h-6 bg-slate-900 rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full ml-1 mt-1" />
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    animate={{ scaleY: [1, 0.1, 1] }}
                    transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 3, delay: 0.1 }}
                  >
                    <div className="w-10 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
                      <div className="w-6 h-6 bg-slate-900 rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full ml-1 mt-1" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-8 h-5 bg-slate-900 rounded-full"
                />
              </div>

              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-6 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full" />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {showFloating.map((float) => (
              <motion.div
                key={float.id}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -80, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute pointer-events-none text-2xl font-bold text-green-500"
                style={{ left: float.x, top: float.y }}
              >
                +{float.value}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {isHighScore && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-6"
          >
            <span className="inline-flex items-center gap-2 text-2xl">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              Amazing! You are doing great!
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </span>
          </motion.div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-8">
          {POWER_UPS.map((powerUp) => (
            <motion.button
              key={powerUp.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => activatePowerUp(powerUp)}
              disabled={score < powerUp.cost || activePowerUp !== null}
              className={`p-4 rounded-2xl border-2 transition-all ${
                activePowerUp === powerUp.id
                  ? "bg-yellow-100 border-yellow-400 dark:bg-yellow-900/30 dark:border-yellow-600"
                  : score >= powerUp.cost && !activePowerUp
                  ? "bg-card border-border hover:border-primary hover:bg-primary/5"
                  : "bg-muted border-muted opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="text-3xl mb-2">{powerUp.emoji}</div>
              <div className="font-semibold text-sm">{powerUp.name}</div>
              <div className="text-xs text-muted-foreground">Cost: {powerUp.cost}</div>
              <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                +{powerUp.multiplier}x for {powerUp.duration / 1000}s
              </div>
            </motion.button>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => { setScore(0); setClicks(0); setMultiplier(1); setActivePowerUp(null); }}
            className="rounded-full"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button asChild variant="default" className="rounded-full">
            <Link to="/game">
              <Apple className="w-4 h-4 mr-2" />
              Medical Game
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
