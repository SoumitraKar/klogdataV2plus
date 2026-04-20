import { ReactNode } from "react";
import { motion } from "motion/react";

interface AnimatedBorderButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  containerClassName?: string;
}

export function AnimatedBorderButton({ 
  children, 
  className = "", 
  onClick,
  containerClassName = ""
}: AnimatedBorderButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative inline-flex overflow-hidden rounded-full p-[1px] group focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950 ${containerClassName}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Comet tail background animation */}
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_240deg,rgba(34,211,238,0.3)_300deg,white_360deg)]" />
      
      {/* Inner surface of the button */}
      <span className={`relative flex h-full w-full items-center justify-center rounded-full bg-slate-950/90 text-sm font-semibold text-white backdrop-blur-3xl overflow-hidden ${className}`}>
        {/* Subtle inner glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="relative z-10">{children}</span>
      </span>
    </motion.button>
  );
}
