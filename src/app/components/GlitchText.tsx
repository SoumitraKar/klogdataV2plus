import { motion } from "motion/react";

interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GlitchText({ children, className = "" }: GlitchTextProps) {
  return (
    <motion.div 
      className={`relative inline-block ${className}`}
      whileHover="hover"
    >
      {/* Main text */}
      <span className="relative z-10">{children}</span>
      
      {/* Glitch layers */}
      <motion.span
        className="absolute top-0 left-0 text-cyan-500 opacity-0"
        variants={{
          hover: {
            opacity: [0, 0.7, 0],
            x: [-2, 2, -2, 2, 0],
            transition: {
              duration: 0.4,
              repeat: 2,
            }
          }
        }}
        aria-hidden="true"
      >
        {children}
      </motion.span>
      
      <motion.span
        className="absolute top-0 left-0 text-indigo-500 opacity-0"
        variants={{
          hover: {
            opacity: [0, 0.7, 0],
            x: [2, -2, 2, -2, 0],
            transition: {
              duration: 0.4,
              repeat: 2,
              delay: 0.1,
            }
          }
        }}
        aria-hidden="true"
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
