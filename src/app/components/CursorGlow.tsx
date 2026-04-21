import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePerformanceMode } from "./PerformanceMode";

export function CursorGlow() {
  const { effectiveMode } = usePerformanceMode();
  const [isEnabled, setIsEnabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const trailXSpring = useSpring(cursorX, { damping: 30, stiffness: 100 });
  const trailYSpring = useSpring(cursorY, { damping: 30, stiffness: 100 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updatePointerMode = () => setIsEnabled(mediaQuery.matches && effectiveMode !== "light");

    updatePointerMode();
    mediaQuery.addEventListener("change", updatePointerMode);

    return () => mediaQuery.removeEventListener("change", updatePointerMode);
  }, [effectiveMode]);

  useEffect(() => {
    if (!isEnabled) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };

    const hideCursor = () => setIsVisible(false);

    let scrollTimeout = 0;
    const handleScroll = () => {
      setIsScrolling(true);
      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => setIsScrolling(false), 120);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", hideCursor);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(scrollTimeout);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cursorX, cursorY, isEnabled]);

  if (!isEnabled) {
    return null;
  }

  const glowOpacity = isVisible && !isScrolling ? 0.5 : 0;
  const trailOpacity = isVisible && !isScrolling ? 0.2 : 0;

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: glowOpacity,
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 blur-xl" />
      </motion.div>

      {/* Secondary glow trail */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[99] mix-blend-screen"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          opacity: trailOpacity,
          marginLeft: "-8px",
          marginTop: "-8px",
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur-2xl" />
      </motion.div>
    </>
  );
}
