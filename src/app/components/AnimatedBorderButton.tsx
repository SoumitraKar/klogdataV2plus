import { ReactNode } from "react";

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
    <button
      onClick={onClick}
      className={`relative inline-flex overflow-hidden rounded-full p-[1px] group focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950 ${containerClassName}`}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/70 to-indigo-500/70" />
      
      <span className={`relative flex h-full w-full items-center justify-center rounded-full bg-slate-950/90 text-sm font-semibold text-white backdrop-blur-3xl overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="relative z-10">{children}</span>
      </span>
    </button>
  );
}
