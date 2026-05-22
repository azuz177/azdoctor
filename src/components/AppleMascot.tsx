import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function AppleMascot() {
  const { dir } = useI18n();
  const x = useMotionValue(typeof window !== "undefined" ? window.innerWidth - 110 : 300);
  const y = useMotionValue(typeof window !== "undefined" ? window.innerHeight - 160 : 400);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setOpen(true), 1500);
    const t2 = setTimeout(() => setOpen(false), 7000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  if (!mounted) return null;

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
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((o) => !o)}
      >
        {/* Speech bubble */}
        <motion.div
          initial={false}
          animate={open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`absolute bottom-full mb-2 ${dir === "rtl" ? "right-0" : "left-1/2 -translate-x-1/2"} w-56 rounded-2xl bg-card border border-border shadow-glow px-4 py-3 text-sm font-medium text-foreground pointer-events-none`}
        >
          <span className="inline-block animate-pulse mr-1">🍏</span>
          Stay healthy and be informed up to date.
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 bg-card border-r border-b border-border" />
        </motion.div>

        {/* Apple */}
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="h-16 w-16 rounded-full grid place-items-center text-5xl bg-gradient-to-br from-primary/30 to-primary/10 shadow-glow backdrop-blur-sm border-2 border-primary/40">
            🍏
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
