import React, { useRef, useState, useEffect } from "react";
import { motion as framerMotion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";

// Override framer motion components to disable 'once: true' globally for scroll-out animations
const motionCache = new Map();
const motion = new Proxy(framerMotion, {
  get: (target, prop) => {
    if (typeof prop !== "string") return target[prop];
    if (!motionCache.has(prop)) {
      const Component = target[prop];
      const WrappedComponent = React.forwardRef((props, ref) => {
        let newProps = props;
        if (props.viewport && props.viewport.once) {
          newProps = {
            ...props,
            viewport: { ...props.viewport, once: false }
          };
        }
        return React.createElement(Component, { ...newProps, ref });
      });
      WrappedComponent.displayName = `Motion(${prop})`;
      motionCache.set(prop, WrappedComponent);
    }
    return motionCache.get(prop);
  }
});

import { 
  ArrowRight, Database, Layers, Network, 
  Cpu, BarChart, Rocket, CheckCircle2, Zap, LayoutDashboard, Building2, Calculator, ShieldCheck,
  Github, Twitter, Linkedin, Mail, ChevronRight
} from "lucide-react";
import { CursorGlow } from "../components/CursorGlow";
import { MatrixRain } from "../components/MatrixRain";
import { ScrollProgress } from "../components/ScrollProgress";
import { AnimatedBorderButton } from "../components/AnimatedBorderButton";

const HERO_IMG = "https://images.unsplash.com/photo-1754738381797-6066f4759065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBkYXJrfGVufDF8fHx8MTc3NjY3MDgxNHww&ixlib=rb-4.1.0&q=80&w=1080";
const EDU_IMG = "https://images.unsplash.com/photo-1692438554564-899322c28dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzc2NjcwODE4fDA&ixlib=rb-4.1.0&q=80&w=1080";
const FIN_IMG = "https://images.unsplash.com/photo-1620365744528-88da1e08ac96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwcmVwb3J0aW5nJTIwZGFzaGJvYXJkJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzc2NjcwODE5fDA&ixlib=rb-4.1.0&q=80&w=1080";

export function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  // Mouse position for magnetic effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="bg-slate-950 text-white min-h-screen" ref={containerRef}>
      <ScrollProgress />
      <CursorGlow />
      <MatrixRain />
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Deep Animated Ambient Gradient Background */}
        <motion.div 
          className="absolute inset-0 z-0 opacity-40 mix-blend-screen"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, rgba(6,182,212,0.15) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(99,102,241,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 0%, rgba(6,182,212,0.15) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(99,102,241,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, rgba(6,182,212,0.15) 0%, transparent 50%), radial-gradient(circle at 0% 0%, rgba(99,102,241,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 100%, rgba(6,182,212,0.15) 0%, transparent 50%), radial-gradient(circle at 100% 0%, rgba(99,102,241,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 0%, rgba(6,182,212,0.15) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(99,102,241,0.15) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950 z-10" />
          <motion.div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
            style={{ 
              backgroundImage: `url(${HERO_IMG})`,
              scale: useTransform(scrollYProgress, [0, 0.3], [1, 1.1]) 
            }}
          />
          
          {/* Continuous Ambient Glows */}
          <motion.div 
            className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-cyan-500/40 blur-[130px] rounded-full z-0 mix-blend-screen"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 0.8, 0.5],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-indigo-500/40 blur-[120px] rounded-full z-0 mix-blend-screen"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.9, 0.4],
              x: [0, -40, 0],
              y: [0, -40, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] bg-purple-500/30 blur-[140px] rounded-full z-0 mix-blend-screen"
            animate={{
              scale: [1, 1.6, 1],
              rotate: [0, 90, 180, 270, 360],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Animated grid overlay - improved with mask */}
          <motion.div 
            className="absolute inset-0 z-[5] opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 2, delay: 1 }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] animate-[pulse_4s_ease-in-out_infinite]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.1)_1px,transparent_1px)] bg-[size:1rem_1rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-50" />
          </motion.div>
          
          {/* Data Streams / Lasers */}
          {[...Array(20)].map((_, i) => {
            const top = 5 + (i * 17) % 90;
            const delay = (i * 0.7) % 5;
            const duration = 3 + (i % 5);
            const opacity = 0.3 + (i % 3) * 0.2;
            const isBlue = i % 2 === 0;
            return (
              <motion.div
                key={`stream-${i}`}
                className={`absolute h-[2px] w-1/4 z-0 ${isBlue ? 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]' : 'bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_15px_#6366f1]'}`}
                style={{ top: `${top}%`, left: '-50%', opacity }}
                animate={{ left: ['-50%', '150%'] }}
                transition={{ duration, repeat: Infinity, ease: "linear", delay }}
              />
            );
          })}

          {/* Radar / Pulse Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] flex items-center justify-center pointer-events-none z-0">
            {/* Radar Sweep */}
            <motion.div 
              className="absolute w-1/2 h-1/2 origin-bottom-right rounded-tl-full bg-gradient-to-br from-cyan-500/10 to-transparent border-t-2 border-l-2 border-cyan-400/40 blur-[1px]"
              style={{ bottom: "50%", right: "50%" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            {[1, 2, 3, 4, 5].map((ring) => (
              <motion.div
                key={`ring-${ring}`}
                className="absolute rounded-full border-[1.5px] border-cyan-500/30 mix-blend-screen shadow-[0_0_20px_rgba(6,182,212,0.2)_inset,0_0_20px_rgba(6,182,212,0.2)]"
                style={{ width: `${ring * 20}%`, height: `${ring * 20}%` }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4 + ring * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Continuous Floating Tech Particles */}
          {[...Array(40)].map((_, i) => {
            const left = (i * 23) % 100;
            const top = (i * 37) % 100;
            const delay = (i * 0.2) % 3;
            const duration = 6 + (i % 8);
            const isCyan = i % 3 !== 0;
            
            return (
              <motion.div
                key={`particle-${i}`}
                className={`absolute w-1.5 h-1.5 rounded-full z-0 ${isCyan ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-indigo-400 shadow-[0_0_10px_#818cf8]'}`}
                style={{ left: `${left}%`, top: `${top}%` }}
                animate={{
                  y: [0, -120, 0],
                  x: [0, (i % 2 === 0 ? 60 : -60), 0],
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0]
                }}
                transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
              />
            );
          })}
        </div>

        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-20 max-w-7xl mx-auto px-6 text-center mt-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Highly Stylish Continuous Animated Badge */}
            <motion.div 
              className="relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-slate-900/60 backdrop-blur-xl border border-cyan-500/30 mb-10 overflow-hidden group shadow-[0_0_30px_rgba(6,182,212,0.3)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                boxShadow: ["0 0 20px rgba(6,182,212,0.2)", "0 0 50px rgba(6,182,212,0.6)", "0 0 20px rgba(6,182,212,0.2)"]
              }}
              transition={{ 
                opacity: { delay: 0.5, duration: 0.5 },
                scale: { delay: 0.5, type: "spring", stiffness: 200 },
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Continuous spinning border glow effect inside badge */}
              <div className="absolute -inset-[100%] -z-10 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(6,182,212,1)_360deg)] opacity-80" />
              <div className="absolute inset-[1px] rounded-full bg-slate-950/90 z-0 backdrop-blur-3xl" />
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-cyan-500/20 z-0"
                animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              />
              
              <motion.span 
                className="relative z-10 flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.span 
                className="relative z-10 text-xs md:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300 uppercase tracking-widest"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                Next-Gen Operating Systems
              </motion.span>
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              Data-Driven <br className="hidden md:block" />
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Operational Intelligence
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Klogdata engineers the operating layer for institutions and enterprises. We unite isolated domains—academics, finance, and administration—into seamless platforms.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.button 
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold bg-white text-slate-900 transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-20"
                  initial={false}
                />
                <motion.span 
                  className="relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Explore Products
                </motion.span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </motion.button>
              <motion.button 
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold bg-white/5 border border-white/10 transition-all text-white backdrop-blur-md relative overflow-hidden group"
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span 
                  className="relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Our Services
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-32 relative z-20 overflow-hidden bg-slate-950">
        {/* Sticky Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMTZ2OE0xNiAyMGg4IiBzdHJva2U9InJnYmEoNiwxODIsMjEyLDAuMikiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=')] opacity-100 bg-fixed bg-center" />
        </div>

        {/* Ambient Glows */}
        <motion.div 
          className="absolute -left-[20%] top-0 w-[50%] h-[100%] bg-gradient-to-br from-cyan-500/10 to-transparent blur-[120px] pointer-events-none"
          animate={{ 
            x: [0, 50, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -right-[20%] bottom-0 w-[50%] h-[100%] bg-gradient-to-tl from-indigo-500/10 to-transparent blur-[120px] pointer-events-none"
          animate={{ 
            x: [0, -50, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Animated background particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`product-particle-${i}`}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full z-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)] mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <LayoutDashboard className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-cyan-300">Ecosystem</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 w-full"
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-white"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, type: "spring" }}
            >
              Our Core <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                Platforms
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Purpose-built automation engines designed to establish control and clarity across your organization.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-2 gap-8 md:gap-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* Eduklog - Live Product */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -12,
                rotateY: 4,
                rotateX: -4,
                scale: 1.02,
                boxShadow: "0 0 60px rgba(6,182,212,0.25)"
              }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative group rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-900/30 to-indigo-900/30 border border-cyan-500/20 backdrop-blur-xl shadow-2xl p-8 md:p-12 flex flex-col justify-between min-h-[480px]"
            >
              {/* Glass Background Image Layer */}
              <motion.div 
                className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-screen"
                style={{ backgroundImage: `url(${EDU_IMG})` }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Tech overlay grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:20px_20px] z-10 opacity-30 group-hover:opacity-60 transition-opacity duration-500 mask-image:linear-gradient(to_bottom,black,transparent)]" />
              
              {/* Cyber scanner line effect */}
              <motion.div
                className="absolute inset-x-0 h-[2px] bg-cyan-400 shadow-[0_0_15px_#22d3ee] z-[15] pointer-events-none opacity-0 group-hover:opacity-100"
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.div 
                className="absolute top-6 right-6 z-20 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                animate={{ boxShadow: ["0 0 10px rgba(16,185,129,0.2)", "0 0 25px rgba(16,185,129,0.6)", "0 0 10px rgba(16,185,129,0.2)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span 
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="mt-0.5">Live Core</span>
              </motion.div>

              <div className="relative z-20 flex-1 flex flex-col" style={{ transform: "translateZ(40px)" }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-500" />
                
                <motion.div 
                  className="w-14 h-14 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 flex items-center justify-center mb-8 relative overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-shadow duration-500"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 z-0" />
                  <Building2 className="w-7 h-7 text-cyan-300 z-10 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                </motion.div>
                
                <h3 className="text-3xl font-black mb-2 flex items-center gap-3 text-white tracking-tight group-hover:text-cyan-50 transition-colors duration-300">
                  Eduklog
                  <motion.span 
                    className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 tracking-normal font-semibold"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    v2.4
                  </motion.span>
                </h3>
                
                <p className="text-cyan-400 font-bold mb-5 tracking-widest text-xs uppercase flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-cyan-500" /> 
                  Unified Campus OS
                </p>
                
                <p className="text-slate-300 mb-8 leading-relaxed font-medium group-hover:text-slate-200 transition-colors duration-300 text-sm md:text-base flex-1">
                  An audit-proof automation engine that unites academics, finance, and administration. Eliminate silos and gain real-time oversight over your entire campus ecosystem.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {["Academic workflows", "Finance integration", "Admin automation"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-300 group-hover:text-white transition-colors duration-300">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all duration-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <motion.button 
                  className="w-full py-4 rounded-xl font-bold text-sm bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-500 flex items-center justify-center gap-2 overflow-hidden relative"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Initialize Protocol <Zap className="w-4 h-4" />
                  </span>
                </motion.button>
              </div>
              
              {/* Corner tech accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-3xl z-20 m-2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 rounded-br-3xl z-20 m-2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* CAKlog - In Progress */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -12,
                rotateY: -4,
                rotateX: -4,
                scale: 1.02,
                boxShadow: "0 0 60px rgba(99,102,241,0.25)"
              }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative group rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 backdrop-blur-xl shadow-2xl p-8 md:p-12 flex flex-col justify-between min-h-[480px]"
            >
              {/* Glass Background Image Layer */}
              <motion.div 
                className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-screen"
                style={{ backgroundImage: `url(${FIN_IMG})` }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Tech overlay grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.1)_1px,transparent_1px)] bg-[size:20px_20px] z-10 opacity-30 group-hover:opacity-60 transition-opacity duration-500 mask-image:linear-gradient(to_bottom,black,transparent)]" />
              
              {/* Cyber scanner line effect */}
              <motion.div
                className="absolute inset-x-0 h-[2px] bg-indigo-400 shadow-[0_0_15px_#818cf8] z-[15] pointer-events-none opacity-0 group-hover:opacity-100"
                initial={{ top: "100%" }}
                animate={{ top: "0%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.div 
                className="absolute top-6 right-6 z-20 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span 
                  className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="mt-0.5">Compiling...</span>
              </motion.div>

              <div className="relative z-20 flex-1 flex flex-col" style={{ transform: "translateZ(40px)" }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-500" />
                
                <motion.div 
                  className="w-14 h-14 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-indigo-500/30 flex items-center justify-center mb-8 relative overflow-hidden shadow-[0_0_20px_rgba(99,102,241,0.15)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-shadow duration-500"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 z-0" />
                  <Calculator className="w-7 h-7 text-indigo-300 z-10 drop-shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                </motion.div>
                
                <h3 className="text-3xl font-black mb-2 flex items-center gap-3 text-white tracking-tight group-hover:text-indigo-50 transition-colors duration-300">
                  CAKlog
                  <motion.span 
                    className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 tracking-normal font-semibold"
                  >
                    BETA
                  </motion.span>
                </h3>
                
                <p className="text-indigo-400 font-bold mb-5 tracking-widest text-xs uppercase flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-indigo-500" /> 
                  Finance & Reporting Control
                </p>
                
                <p className="text-slate-300 mb-8 leading-relaxed font-medium group-hover:text-slate-200 transition-colors duration-300 text-sm md:text-base flex-1">
                  Upcoming finance-focused software designed to simplify reporting and day-to-day operational control. Structured to launch with product-led clarity.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {["Advanced operational control", "Simplified reporting", "Audit-ready tracking"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-300 group-hover:text-white transition-colors duration-300">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/20 group-hover:border-indigo-400 transition-all duration-300">
                        <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <motion.button 
                  className="w-full py-4 rounded-xl font-bold text-sm bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 group-hover:bg-indigo-500 group-hover:text-slate-950 transition-all duration-500 flex items-center justify-center gap-2 overflow-hidden relative"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Request Beta Access <Rocket className="w-4 h-4" />
                  </span>
                </motion.button>
              </div>
              
              {/* Corner tech accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-indigo-500/50 rounded-tl-3xl z-20 m-2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-indigo-500/50 rounded-br-3xl z-20 m-2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-slate-50 border-y border-orange-200/50 relative overflow-hidden">
        {/* Sticky Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMTZ2OE0xNiAyMGg4IiBzdHJva2U9InJnYmEoMjQ5LDExNSwyMiwwLjE1KSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==')] opacity-100 bg-fixed bg-center" />
        </div>
        
        {/* Ambient Glows */}
        <motion.div 
          className="absolute -left-[20%] top-0 w-[50%] h-[100%] bg-gradient-to-br from-orange-400/20 to-transparent blur-[120px] pointer-events-none"
          animate={{ 
            x: [0, 50, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -right-[20%] bottom-0 w-[50%] h-[100%] bg-gradient-to-tl from-orange-500/20 to-transparent blur-[120px] pointer-events-none"
          animate={{ 
            x: [0, -50, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Animated background particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`service-particle-${i}`}
            className="absolute w-2 h-2 bg-orange-500/40 rounded-full z-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/80 border border-orange-200 text-orange-600 text-sm font-bold mb-8 shadow-sm backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Layers className="w-4 h-4" />
            <span>Core Capabilities</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 w-full"
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-extrabold mb-8 text-slate-900 tracking-tight"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, type: "spring" }}
            >
              Enterprise <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                Services
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Beyond products, we offer deep technological expertise to modernize your digital infrastructure.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {[
              {
                icon: <Database className="w-8 h-8 text-orange-500" />,
                title: "Data Architecture",
                desc: "We design highly scalable data systems that structure unstructured inputs into actionable intelligence.",
                delay: 0.1
              },
              {
                icon: <Network className="w-8 h-8 text-orange-500" />,
                title: "System Integration",
                desc: "Connecting disparate legacy software into a unified, secure, and modern communication layer.",
                delay: 0.2
              },
              {
                icon: <Cpu className="w-8 h-8 text-orange-500" />,
                title: "Custom Automation",
                desc: "Replacing repetitive manual workflows with bespoke, audit-proof automated pipelines.",
                delay: 0.3
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
                title: "Cybersecurity & Audit",
                desc: "Ensuring your operational tools meet modern compliance, tracking, and security standards.",
                delay: 0.4
              },
              {
                icon: <BarChart className="w-8 h-8 text-orange-500" />,
                title: "Advanced Analytics",
                desc: "Implementing real-time dashboards to give stakeholders top-down visibility.",
                delay: 0.5
              },
              {
                icon: <Zap className="w-8 h-8 text-orange-500" />,
                title: "Cloud Migration",
                desc: "Seamlessly lifting your critical applications to a highly available cloud environment.",
                delay: 0.6
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  delay: service.delay,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                }}
                className="bg-white border border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-10px_rgba(249,115,22,0.15)] hover:border-orange-300/50 p-8 rounded-3xl group transition-all duration-500 relative overflow-hidden"
              >
                {/* Animated gradient background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
                
                {/* Diagonal scan line */}
                <motion.div
                  className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent rotate-45"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Large watermark icon */}
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity transform translate-x-4 -translate-y-4 group-hover:scale-110 duration-500">
                  {service.icon}
                </div>

                <motion.div 
                  className="mb-6 w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center relative z-10 border border-orange-100 shadow-inner group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-shadow duration-300"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {service.icon}
                </motion.div>
                <motion.h3 
                  className="text-xl font-extrabold mb-3 text-slate-900 relative z-10 group-hover:text-orange-600 transition-colors duration-300"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: service.delay + 0.1 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p 
                  className="text-slate-600 leading-relaxed text-sm relative z-10 font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: service.delay + 0.2 }}
                >
                  {service.desc}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats/Tech Section */}
      <section className="py-32 relative overflow-hidden bg-slate-950">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMTZ2OE0xNiAyMGg4IiBzdHJva2U9InJnYmEoNiwxODIsMjEyLDAuMikiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=')] opacity-100 bg-fixed bg-center" />
          <motion.div 
            className="absolute top-1/4 right-[10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-[10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          />
        </div>

        {/* Animated background particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`stats-particle-${i}`}
            className="absolute w-1.5 h-1.5 bg-indigo-400/30 rounded-full z-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="bg-gradient-to-br from-cyan-900/30 to-indigo-900/30 border border-cyan-500/20 rounded-3xl p-12 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ boxShadow: "0 0 80px rgba(6,182,212,0.2)" }}
          >
            <motion.div 
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626908013943-df94de54984c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwYWJzdHJhY3R8ZW58MXx8fHwxNzc2NjQ3NDcwfDA&ixlib=rb-4.1.0&q=80&w=1080')] bg-cover bg-center opacity-10 mix-blend-screen"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div 
              className="relative z-10 lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)] mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-cyan-300">Enterprise Security</span>
              </motion.div>
              <motion.h2 
                className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Built for scale. <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                  Secure by design.
                </span>
              </motion.h2>
              <motion.p 
                className="text-lg text-slate-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Our platforms handle millions of data points daily, providing unified reporting without sacrificing performance.
              </motion.p>
              <motion.div 
                className="grid grid-cols-2 gap-8"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="text-4xl font-extrabold text-cyan-400 mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    99.9%
                  </motion.div>
                  <motion.div 
                    className="text-sm text-slate-400 font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    Uptime SLA
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="text-4xl font-extrabold text-indigo-400 mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    100%
                  </motion.div>
                  <motion.div 
                    className="text-sm text-slate-400 font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                  >
                    Audit-Ready
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative z-10 lg:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            >
              <div className="relative w-64 h-64">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-cyan-500/30 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border border-indigo-500/40 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 border border-purple-500/30 rounded-full"
                />
                
                {/* Orbiting dots */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                    style={{
                      top: "50%",
                      left: "50%",
                      marginTop: "-6px",
                      marginLeft: "-6px",
                    }}
                    animate={{
                      x: [
                        Math.cos((i * 120 * Math.PI) / 180) * 100,
                        Math.cos(((i * 120 + 360) * Math.PI) / 180) * 100,
                      ],
                      y: [
                        Math.sin((i * 120 * Math.PI) / 180) * 100,
                        Math.sin(((i * 120 + 360) * Math.PI) / 180) * 100,
                      ],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.5,
                    }}
                  />
                ))}
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.4)]"
                    animate={{ 
                      boxShadow: [
                        "0 0 50px rgba(34,211,238,0.4)",
                        "0 0 80px rgba(99,102,241,0.6)",
                        "0 0 50px rgba(34,211,238,0.4)",
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                  >
                    <Rocket className="w-12 h-12 text-white" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative border-t border-orange-200/50 bg-slate-50 overflow-hidden">
        {/* Sticky Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMTZ2OE0xNiAyMGg4IiBzdHJva2U9InJnYmEoMjQ5LDExNSwyMiwwLjE1KSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==')] opacity-100 bg-fixed bg-center" />
        </div>

        {/* Ambient Glows */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-r from-orange-400/20 to-amber-500/20 blur-[120px] pointer-events-none rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated background particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-500/40 rounded-full z-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/80 border border-orange-200 text-orange-600 text-sm font-bold mb-8 shadow-sm backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Zap className="w-4 h-4" />
            <span>Ready for the next level?</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-extrabold mb-8 text-slate-900 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ready to transform <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              your operations?
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Whether you need the comprehensive power of Eduklog, are preparing for CAKlog, or require custom architectural solutions.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <AnimatedBorderButton 
              containerClassName="w-full sm:w-auto" 
              className="px-12 py-5 text-lg font-bold shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:shadow-[0_0_60px_rgba(249,115,22,0.5)] transition-shadow duration-500"
            >
              <motion.span 
                className="relative z-10 flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                Schedule a Consultation
                <Rocket className="w-5 h-5" />
              </motion.span>
            </AnimatedBorderButton>
            
            <motion.button 
              className="w-full sm:w-auto px-12 py-5 rounded-full font-bold bg-white border-2 border-orange-200 text-orange-600 shadow-sm relative overflow-hidden group hover:border-orange-400 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="relative z-10 flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                Contact Sales
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}