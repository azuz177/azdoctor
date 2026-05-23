import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer } from "@/components";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/apple-game")({
  component: AppleGamePage,
});

type FloatingPoint = {
  id: number;
  x: number;
  y: number;
  value: number;
};

function AppleGamePage() {
  const { t } = useI18n();
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [floatingPoints, setFloatingPoints] = useState<FloatingPoint[]>([]);
  const [powerUps, setPowerUps] = useState({
    doubleClick: false,
    autoClicker: false,
    goldenApple: false,
  });
  const [autoClickerInterval, setAutoClickerInterval] = useState<ReturnType<typeof setInterval> | null>(null);

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("appleGameHighScore");
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Save high score when score changes
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("appleGameHighScore", score.toString());
    }
  }, [score, highScore]);

  // Cleanup auto clicker on unmount
  useEffect(() => {
    return () => {
      if (autoClickerInterval) {
        clearInterval(autoClickerInterval);
      }
    };
  }, [autoClickerInterval]);

  const addFloatingPoint = useCallback((x: number, y: number, value: number) => {
    const id = Date.now() + Math.random();
    setFloatingPoints((prev) => [...prev, { id, x, y, value }]);
    setTimeout(() => {
      setFloatingPoints((prev) => prev.filter((fp) => fp.id !== id));
    }, 1000);
  }, []);

  const handleAppleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const multiplier = powerUps.doubleClick ? 2 : 1;
    const points = powerUps.goldenApple ? 10 * multiplier : 1 * multiplier;
    
    setScore((s) => s + points);
    setClicks((c) => c + 1);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    addFloatingPoint(x, y, points);
  }, [powerUps.doubleClick, powerUps.goldenApple, addFloatingPoint]);

  const buyPowerUp = (type: "doubleClick" | "autoClicker" | "goldenApple", cost: number) => {
    if (score >= cost && !powerUps[type]) {
      setScore((s) => s - cost);
      setPowerUps((prev) => ({ ...prev, [type]: true }));

      if (type === "autoClicker") {
        const interval = setInterval(() => {
          setScore((s) => s + 1);
          setClicks((c) => c + 1);
        }, 1000);
        setAutoClickerInterval(interval);
      }
    }
  };

  const handleReset = () => {
    setScore(0);
    setClicks(0);
    setPowerUps({ doubleClick: false, autoClicker: false, goldenApple: false });
    if (autoClickerInterval) {
      clearInterval(autoClickerInterval);
      setAutoClickerInterval(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">Apple Clicker</h1>
          <p className="text-muted-foreground mb-8">
            Click the apple to earn points! Buy power-ups to increase your earnings.
          </p>

          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-3xl font-bold">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Clicks</p>
              <p className="text-3xl font-bold">{clicks}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">High Score</p>
              <p className="text-3xl font-bold text-yellow-600">{highScore}</p>
            </div>
          </div>

          <div className="relative inline-block mb-8">
            <motion.button
              onClick={handleAppleClick}
              className="text-9xl cursor-pointer select-none focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {powerUps.goldenApple ? "🍎" : "🍏"}
            </motion.button>

            <AnimatePresence>
              {floatingPoints.map((fp) => (
                <motion.div
                  key={fp.id}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -50 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute pointer-events-none text-lg font-bold text-green-600"
                  style={{ left: fp.x, top: fp.y }}
                >
                  +{fp.value}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <Button
              variant={powerUps.doubleClick ? "default" : "outline"}
              className="h-auto py-4 flex-col"
              onClick={() => buyPowerUp("doubleClick", 50)}
              disabled={powerUps.doubleClick}
            >
              <span className="text-2xl mb-1">✌️</span>
              <span className="text-sm font-medium">Double Click</span>
              <span className="text-xs text-muted-foreground">50 pts</span>
            </Button>

            <Button
              variant={powerUps.autoClicker ? "default" : "outline"}
              className="h-auto py-4 flex-col"
              onClick={() => buyPowerUp("autoClicker", 100)}
              disabled={powerUps.autoClicker}
            >
              <span className="text-2xl mb-1">🤖</span>
              <span className="text-sm font-medium">Auto Clicker</span>
              <span className="text-xs text-muted-foreground">100 pts</span>
            </Button>

            <Button
              variant={powerUps.goldenApple ? "default" : "outline"}
              className="h-auto py-4 flex-col"
              onClick={() => buyPowerUp("goldenApple", 200)}
              disabled={powerUps.goldenApple}
            >
              <span className="text-2xl mb-1">🍎</span>
              <span className="text-sm font-medium">Golden Apple</span>
              <span className="text-xs text-muted-foreground">200 pts</span>
            </Button>
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={handleReset}>
              Reset Game
            </Button>
            <Button asChild>
              <Link to="/game">{t("nav.game")}</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
