import { motion, useScroll } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 origin-left z-[200] shadow-[0_0_10px_rgba(34,211,238,0.5)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
