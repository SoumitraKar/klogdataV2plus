import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };

    const hideCursor = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", hideCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 0.5 : 0,
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 blur-xl" />
      </motion.div>

      {/* Secondary glow trail */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[99] mix-blend-screen"
        style={{
          x: useSpring(cursorX, { damping: 30, stiffness: 100 }),
          y: useSpring(cursorY, { damping: 30, stiffness: 100 }),
          opacity: isVisible ? 0.2 : 0,
          marginLeft: "-8px",
          marginTop: "-8px",
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur-2xl" />
      </motion.div>
    </>
  );
}
