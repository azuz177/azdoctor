import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";

const HEALTH_SLOGANS = [
  "An apple a day keeps the doctor away!",
  "Stay strong, stay healthy!",
  "Eat your greens!",
  "Drink water, stay hydrated!",
  "Move your body daily!",
  "Sleep well, live well!",
  "Breathe deep, stress less!",
  "Veggies are your friends!",
  "Every step counts!",
  "Health is true wealth!",
  "Brush twice, smile bright!",
  "Vitamin C for immunity!",
  "Walk 10k steps today!",
  "Greens for the win!",
  "Your health matters most!",
  "Sunshine boosts mood!",
  "Balance is the key!",
  "Stretch every morning!",
  "Fruit up your life!",
  "Strong bones, strong you!",
  "Eat the rainbow!",
  "Hydrate to feel great!",
  "Laugh often, live long!",
  "Stand up and stretch!",
  "You are what you eat!",
];

export function AppleMascot() {
  const { dir } = useI18n();
  const x = useMotionValue(typeof window !== "undefined" ? window.innerWidth - 180 : 300);
  const y = useMotionValue(typeof window !== "undefined" ? window.innerHeight - 280 : 400);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sloganIndex, setSloganIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [expression, setExpression] = useState<"happy" | "excited" | "winking">("happy");
  const constraintsRef = useRef<HTMLDivElement>(null);
  const eyeControls = useAnimation();

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setOpen(true), 800);
    const t2 = setTimeout(() => setOpen(false), 5000);

    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000);

    const expressionInterval = setInterval(() => {
      const expressions: ("happy" | "excited" | "winking")[] = ["happy", "excited", "winking"];
      setExpression(expressions[Math.floor(Math.random() * expressions.length)]);
    }, 5000);

    return () => {
      clearTimeout(t);
      clearTimeout(t2);
      clearInterval(blinkInterval);
      clearInterval(expressionInterval);
    };
  }, []);

  useEffect(() => {
    const sloganInterval = setInterval(() => {
      setSloganIndex((prev) => (prev + 1) % HEALTH_SLOGANS.length);
      setIsSpeaking(true);
      setExpression("excited");
      setOpen(true);
      setTimeout(() => {
        setIsSpeaking(false);
        setExpression("happy");
        setOpen(false);
      }, 4000);
    }, 10000);
    return () => clearInterval(sloganInterval);
  }, []);

  const handleClick = () => {
    eyeControls.start({
      scale: [1, 1.3, 1],
      transition: { duration: 0.3 }
    });
    setSloganIndex((prev) => (prev + 1) % HEALTH_SLOGANS.length);
    setIsSpeaking(true);
    setExpression("excited");
    setOpen(true);
    setTimeout(() => {
      setIsSpeaking(false);
      setExpression("happy");
      setOpen(false);
    }, 3000);
  };

  if (!mounted) return null;

  const getMouthShape = () => {
    if (open) {
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative"
        >
          <div className="w-8 h-7 bg-pink-400 rounded-full overflow-hidden border-2 border-pink-500">
            <div className="w-full h-3 bg-pink-300 rounded-t-full" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-3 bg-pink-500 rounded-full" />
          </div>
        </motion.div>
      );
    }

    switch (expression) {
      case "excited":
        return (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
            className="w-9 h-7 bg-pink-400 rounded-full overflow-hidden border-2 border-pink-500 relative"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-pink-500 rounded-full" />
            <div className="absolute -bottom-1 left-1 -rotate-12 w-3 h-2 bg-white rounded-full" />
            <div className="absolute -bottom-1 right-1 rotate-12 w-3 h-2 bg-white rounded-full" />
          </motion.div>
        );
      case "winking":
        return (
          <motion.div
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-1"
          >
            <div className="w-6 h-4 bg-pink-400 rounded-full border-2 border-pink-500" />
            <div className="w-4 h-3 bg-pink-400 rounded-full border-2 border-pink-500" />
          </motion.div>
        );
      default:
        return (
          <motion.div
            animate={{ scaleX: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-5 bg-pink-400 rounded-full border-2 border-pink-500 relative overflow-hidden"
          >
            <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-2 bg-pink-500 rounded-full" />
          </motion.div>
        );
    }
  };

  return (
    <div
      ref={constraintsRef}
      className="fixed inset-0 pointer-events-none z-50"
      dir="ltr"
    >
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={constraintsRef}
        style={{ x, y }}
        className="absolute pointer-events-auto cursor-grab active:cursor-grabbing select-none"
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        <Link to="/apple-game">
          <motion.div
            initial={false}
            animate={open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`absolute bottom-full mb-4 ${dir === "rtl" ? "right-0" : "left-1/2 -translate-x-1/2"} w-72 rounded-2xl bg-card border-2 border-primary shadow-glow px-4 py-3 text-sm font-medium text-foreground pointer-events-none`}
          >
            <motion.span
              animate={isSpeaking ? { y: [0, -2, 0, -2, 0] } : {}}
              transition={{ duration: 0.5, repeat: isSpeaking ? 2 : 0 }}
              className="inline-block mr-2"
            >
              🍏
            </motion.span>
            {HEALTH_SLOGANS[sloganIndex]}
            <div className={`absolute -bottom-1.5 h-3 w-3 rotate-45 bg-card border-r border-b border-primary ${dir === "rtl" ? "right-8" : "left-1/2 -translate-x-1/2"}`} />
          </motion.div>

          <motion.div
            animate={{ y: [0, -12, 0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.4 }}
              className="relative w-36 h-36"
            >
              {/* Green Apple Body - Pixel/Disney Style */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-300 via-green-500 to-green-700 shadow-glow"
                style={{ borderRadius: "50% 50% 45% 45% / 55% 55% 45% 45%" }}
                animate={{
                  boxShadow: [
                    "0 15px 50px rgba(34, 197, 94, 0.5)",
                    "0 25px 70px rgba(34, 197, 94, 0.7)",
                    "0 15px 50px rgba(34, 197, 94, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Pixel-style highlights */}
                <div className="absolute top-5 left-6 w-8 h-8 bg-white/50 rounded-full" />
                <div className="absolute top-6 left-7 w-4 h-4 bg-white/80 rounded-full" />
                <div className="absolute top-12 right-8 w-4 h-3 bg-white/20 blur-sm" />
              </motion.div>

              {/* Leaf */}
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-10 bg-gradient-to-br from-green-400 to-emerald-600"
                style={{ borderRadius: "0% 100% 0% 100%" }}
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Face Container */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-3">
                {/* Eyebrows */}
                <motion.div
                  animate={expression === "excited" ? { y: [-2, 0] } : { y: 0 }}
                  className="flex gap-8 mb-1"
                >
                  <div className="w-5 h-1.5 bg-green-800 rounded-full -rotate-12" />
                  <div className="w-5 h-1.5 bg-green-800 rounded-full rotate-12" />
                </motion.div>

                {/* Eyes - Disney/Pixel Style */}
                <div className="flex gap-3 mb-1">
                  {/* Left Eye */}
                  <div className="relative">
                    {expression === "winking" ? (
                      <motion.div
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ duration: 0.2 }}
                        className="w-8 h-2 bg-green-800 rounded-full mt-3"
                      />
                    ) : (
                      <motion.div
                        animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
                        transition={{ duration: 0.15 }}
                        className="relative"
                      >
                        <motion.div
                          animate={eyeControls}
                          className="w-9 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner border-2 border-green-100"
                        >
                          {/* Large Disney eyes */}
                          <motion.div
                            animate={open ? { x: [-1, 1, -1, 0] } : { x: 0 }}
                            className="w-6 h-6 bg-emerald-600 rounded-full relative"
                          >
                            <div className="absolute top-0.5 left-1 w-2.5 h-2.5 bg-emerald-900 rounded-full" />
                            <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full" />
                            <div className="absolute bottom-1 left-1.5 w-3 h-3 bg-emerald-400/50 rounded-full blur-sm" />
                          </motion.div>
                        </motion.div>
                        {/* Eyelashes */}
                        <div className="absolute -top-1 left-1 w-1 h-3 bg-green-800 rotate-45 rounded-full" />
                        <div className="absolute -top-1 right-1 w-1 h-3 bg-green-800 -rotate-45 rounded-full" />
                      </motion.div>
                    )}
                  </div>

                  {/* Right Eye */}
                  <div className="relative">
                    <motion.div
                      animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
                      transition={{ duration: 0.15 }}
                      className="relative"
                    >
                      <motion.div
                        className="w-9 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner border-2 border-green-100"
                      >
                        <motion.div
                          animate={open ? { x: [1, -1, 1, 0] } : { x: 0 }}
                          className="w-6 h-6 bg-emerald-600 rounded-full relative"
                        >
                          <div className="absolute top-0.5 left-1 w-2.5 h-2.5 bg-emerald-900 rounded-full" />
                          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full" />
                          <div className="absolute bottom-1 left-1.5 w-3 h-3 bg-emerald-400/50 rounded-full blur-sm" />
                        </motion.div>
                      </motion.div>
                      {/* Eyelashes */}
                      <div className="absolute -top-1 left-1 w-1 h-3 bg-green-800 rotate-45 rounded-full" />
                      <div className="absolute -top-1 right-1 w-1 h-3 bg-green-800 -rotate-45 rounded-full" />
                    </motion.div>
                  </div>
                </div>

                {/* Rosy Cheeks */}
                <div className="absolute top-16 left-4 w-4 h-3 bg-pink-300/70 rounded-full blur-sm" />
                <div className="absolute top-16 right-4 w-4 h-3 bg-pink-300/70 rounded-full blur-sm" />

                {/* Mouth */}
                <motion.div
                  animate={isSpeaking ? { scale: 1.2 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="mt-1"
                >
                  {getMouthShape()}
                </motion.div>
              </div>

              {/* Stem */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-6 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full" />
            </motion.div>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}
