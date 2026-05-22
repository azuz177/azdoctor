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
];

export function AnimatedAppleAvatar() {
  const { dir } = useI18n();
  const x = useMotionValue(typeof window !== "undefined" ? window.innerWidth - 180 : 300);
  const y = useMotionValue(typeof window !== "undefined" ? window.innerHeight - 280 : 400);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sloganIndex, setSloganIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const eyeControls = useAnimation();

  useEffect(() => {
    setMounted(true);
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3500);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const sloganInterval = setInterval(() => {
      setSloganIndex((prev) => (prev + 1) % HEALTH_SLOGANS.length);
      setOpen(true);
      setTimeout(() => setOpen(false), 3000);
    }, 20000);
    return () => clearInterval(sloganInterval);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen((o) => !o);
    eyeControls.start({ scale: [1, 1.3, 1], transition: { duration: 0.3 } });
  };

  if (!mounted) return null;

  const leftPos = dir === "rtl" ? "right-4" : "left-4";

  return (
    <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-50" dir="ltr">
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={constraintsRef}
        style={{ x, y }}
        className="absolute pointer-events-auto cursor-grab active:cursor-grabbing select-none"
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          initial={false}
          animate={open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`absolute bottom-full mb-4 ${leftPos} w-72 rounded-2xl bg-card border-2 border-primary shadow-glow px-4 py-3 text-sm font-medium text-foreground pointer-events-none`}
        >
          <span className="inline-block mr-2 text-xl">🍏</span>
          <span>{HEALTH_SLOGANS[sloganIndex]}</span>
          <div className={`absolute -bottom-1.5 left-8 h-3 w-3 rotate-45 bg-card border-r border-b border-primary`} />
        </motion.div>

        <Link to="/apple-clicker" onClick={handleClick}>
          <motion.div
            animate={{ y: [0, -12, 0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.4 }}
              className="relative w-32 h-32"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-400 via-red-500 to-red-700"
                style={{ borderRadius: "50% 50% 45% 45% / 60% 60% 40% 40%" }}
                animate={{ boxShadow: ["0 15px 50px rgba(239, 68, 68, 0.5)", "0 20px 60px rgba(239, 68, 68, 0.7)", "0 15px 50px rgba(239, 68, 68, 0.5)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="absolute top-4 left-5 w-8 h-8 bg-white/40 rounded-full blur-sm" />
                <div className="absolute top-8 right-6 w-5 h-4 bg-white/20 rounded-full blur-md rotate-45" />
              </motion.div>

              <motion.div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-8 bg-gradient-to-br from-green-400 to-green-600"
                style={{ borderRadius: "0% 100% 0% 100%", transformOrigin: "bottom center" }}
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                <div className="flex gap-4 mb-2">
                  <motion.div
                    animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    <motion.div animate={eyeControls} className="w-7 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner">
                      <motion.div animate={open ? { x: [-1, 1, -1, 0] } : { x: 0 }} className="w-4 h-4 bg-slate-900 rounded-full">
                        <div className="w-1.5 h-1.5 bg-white rounded-full ml-1 mt-1" />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    <motion.div className="w-7 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner">
                      <motion.div animate={open ? { x: [1, -1, 1, 0] } : { x: 0 }} className="w-4 h-4 bg-slate-900 rounded-full">
                        <div className="w-1.5 h-1.5 bg-white rounded-full ml-1 mt-1" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>

                <div className="absolute top-14 left-5 w-4 h-3 bg-pink-400/60 rounded-full blur-sm" />
                <div className="absolute top-14 right-5 w-4 h-3 bg-pink-400/60 rounded-full blur-sm" />

                <motion.div
                  animate={open ? { scale: 1.5 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {open ? (
                    <div className="w-6 h-6 bg-gradient-to-b from-pink-300 to-pink-500 rounded-full mt-1">
                      <div className="w-full h-3 bg-red-600/20 rounded-t-full" />
                    </div>
                  ) : (
                    <motion.div
                      animate={{ scaleX: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-7 h-3 bg-slate-900 rounded-full mt-1"
                    />
                  )}
                </motion.div>
              </div>

              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-5 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full" />
            </motion.div>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}
