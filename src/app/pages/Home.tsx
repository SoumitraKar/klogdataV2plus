import { useOutletContext } from "react-router";
import { motion } from "motion/react";

import { 
  ArrowRight, Database, Layers, Network, 
  Cpu, BarChart, Rocket, CheckCircle2, Zap, LayoutDashboard, Building2, Calculator, ShieldCheck,
  Github, Twitter, Linkedin, Mail, ChevronRight
} from "lucide-react";
import { ScrollProgress } from "../components/ScrollProgress";
import { useSectionActivity } from "../components/useSectionActivity";
import type { RootOutletContext } from "../components/layout/Root";

const EDU_IMG = new URL("../../imports/eduklog_BG.PNG", import.meta.url).href;
const FIN_IMG = new URL("../../imports/caKlog_BG.jpg", import.meta.url).href;

const createParticleSpecs = (
  count: number,
  maxOffset = 60,
  maxScale = 1.8,
  position = { leftStart: 0, leftSpan: 100, topStart: 0, topSpan: 100 },
) =>
  Array.from({ length: count }, (_, index) => ({
    delay: (index * 0.37) % 3,
    duration: 3 + ((index * 1.17) % 4),
    left: position.leftStart + ((index * 19) % position.leftSpan),
    scale: 1 + ((index % 3) * (maxScale - 1)) / 2,
    top: position.topStart + ((index * 31) % position.topSpan),
    x: index % 2 === 0 ? maxOffset : -maxOffset,
  }));

const HERO_PARTICLES = createParticleSpecs(6, 60, 1.8, {
  leftStart: 24,
  leftSpan: 52,
  topStart: 26,
  topSpan: 34,
});
const PRODUCT_PARTICLES = createParticleSpecs(6, 40, 1.35, {
  leftStart: 28,
  leftSpan: 44,
  topStart: 8,
  topSpan: 18,
});
const SERVICE_PARTICLES = createParticleSpecs(6, 40, 1.35, {
  leftStart: 28,
  leftSpan: 44,
  topStart: 8,
  topSpan: 18,
});
const STATS_PARTICLES = createParticleSpecs(5, 24, 1.2);
const CTA_PARTICLES = createParticleSpecs(7, 40, 1.35, {
  leftStart: 26,
  leftSpan: 48,
  topStart: 10,
  topSpan: 20,
});
const DEFERRED_SECTION_STYLE: React.CSSProperties = {
  containIntrinsicSize: "1200px",
  contentVisibility: "auto",
};

export function Home() {
  const { openConsultation } = useOutletContext<RootOutletContext>();
  const heroSection = useSectionActivity<HTMLElement>();
  const productsSection = useSectionActivity<HTMLElement>();
  const servicesSection = useSectionActivity<HTMLElement>();
  const statsSection = useSectionActivity<HTMLElement>();
  const ctaSection = useSectionActivity<HTMLElement>();

  const heroEffectsEnabled = heroSection.isNear;
  const productEffectsEnabled = productsSection.isNear;
  const serviceEffectsEnabled = servicesSection.isNear;
  const statsEffectsEnabled = statsSection.isNear;
  const ctaEffectsEnabled = ctaSection.isNear;

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <ScrollProgress />
      {/* Hero Section */}
      <section ref={heroSection.ref} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950 z-10" />
          
          {/* Continuous Ambient Glows */}
          <motion.div 
            className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-cyan-500/40 blur-[130px] rounded-full z-0 mix-blend-screen"
            animate={heroEffectsEnabled ? {
              scale: [1, 1.4, 1],
              opacity: [0.5, 0.8, 0.5],
              x: [0, 50, 0],
              y: [0, 30, 0],
            } : undefined}
            transition={heroEffectsEnabled ? { duration: 15, repeat: Infinity, ease: "easeInOut" } : undefined}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-indigo-500/40 blur-[120px] rounded-full z-0 mix-blend-screen"
            animate={heroEffectsEnabled ? {
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.9, 0.4],
              x: [0, -40, 0],
              y: [0, -40, 0],
            } : undefined}
            transition={heroEffectsEnabled ? { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 } : undefined}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] bg-purple-500/30 blur-[140px] rounded-full z-0 mix-blend-screen"
            animate={undefined}
            transition={undefined}
          />
          
          {/* Animated grid overlay - improved with mask */}
          <motion.div 
            className="absolute inset-0 z-[5] opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ duration: 2, delay: 1 }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.1)_1px,transparent_1px)] bg-[size:1rem_1rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-50" />
          </motion.div>
          
          {/* Data Streams / Lasers */}
          {heroEffectsEnabled && [...Array(4)].map((_, i) => {
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
              animate={undefined}
              transition={undefined}
            />
            {[1, 2].map((ring) => (
              <div
                key={`ring-${ring}`}
                className="absolute rounded-full border-[1.5px] border-cyan-500/30 mix-blend-screen shadow-[0_0_20px_rgba(6,182,212,0.2)_inset,0_0_20px_rgba(6,182,212,0.2)]"
                style={{ width: `${ring * 20}%`, height: `${ring * 20}%`, opacity: 0.45 }}
              />
            ))}
          </div>

          {/* Continuous Floating Tech Particles */}
          {heroEffectsEnabled && HERO_PARTICLES.map((particle, i) => {
            const isCyan = i % 3 !== 0;
            
            return (
              <motion.div
                key={`particle-${i}`}
                className={`absolute w-1.5 h-1.5 rounded-full z-0 ${isCyan ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-indigo-400 shadow-[0_0_10px_#818cf8]'}`}
                style={{ left: `${particle.left}%`, top: `${particle.top}%` }}
                animate={{
                  y: [0, -120, 0],
                  x: [0, particle.x, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0]
                }}
                transition={{ duration: particle.duration + 2, repeat: Infinity, ease: "easeInOut", delay: particle.delay }}
              />
            );
          })}
        </div>

        <motion.div className="relative z-20 max-w-7xl mx-auto px-6 text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              Data-Driven <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4f4f] to-[#df9dff]">
                Operational Intelligence
              </span>
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
                className="w-full cursor-pointer sm:w-auto px-8 py-4 rounded-full font-bold bg-white text-slate-900 flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                <motion.span 
                  className="relative z-10 inline-block transition-transform duration-200 group-hover:scale-110"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Explore Products
                </motion.span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-200 group-hover:translate-x-1.5 group-hover:scale-110" />
              </motion.button>
              <motion.button 
                className="w-full cursor-pointer sm:w-auto px-8 py-4 rounded-full font-bold bg-white/5 border border-white/10 text-white backdrop-blur-md relative overflow-hidden group transition-colors duration-200 hover:bg-white/10"
              >
                <motion.span 
                  className="relative z-10 inline-block transition-transform duration-200 group-hover:scale-110"
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
      <section ref={productsSection.ref} id="products" className="py-20 sm:py-32 relative z-20 overflow-hidden bg-slate-950" style={DEFERRED_SECTION_STYLE}>
        {/* Sticky Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMTZ2OE0xNiAyMGg4IiBzdHJva2U9InJnYmEoNiwxODIsMjEyLDAuMikiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=')] opacity-100 bg-center" />
        </div>

        {/* Ambient Glows */}
        {productEffectsEnabled && <motion.div 
          className="absolute -left-[20%] top-0 w-[50%] h-[100%] bg-gradient-to-br from-cyan-500/10 to-transparent blur-[120px] pointer-events-none"
          animate={{ 
            x: [0, 50, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />}
        {productEffectsEnabled && <motion.div 
          className="absolute -right-[20%] bottom-0 w-[50%] h-[100%] bg-gradient-to-tl from-indigo-500/10 to-transparent blur-[120px] pointer-events-none"
          animate={{ 
            x: [0, -50, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />}

        {/* Animated background particles */}
        {productEffectsEnabled && PRODUCT_PARTICLES.map((particle, i) => (
          <motion.div
            key={`product-particle-${i}`}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full z-0"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.1, 0.8, 0.1],
              scale: [1, particle.scale, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">

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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4f4f] to-[#df9dff]">
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
              transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
              className="platform-card-sheen relative group rounded-3xl overflow-hidden bg-slate-900/35 border border-cyan-400/30 backdrop-blur-2xl [--tw-backdrop-opacity:opacity(0)] shadow-none hover:shadow-[0_22px_70px_-30px_rgba(8,145,178,0.32)] transition-shadow duration-300 p-8 md:p-12 flex flex-col justify-between min-h-[480px]"
            >
              {/* Glass Background Image Layer */}
              <motion.div 
                className="absolute inset-0 bg-cover bg-center opacity-[0.18] mix-blend-screen"
                style={{ backgroundImage: `url(${EDU_IMG})` }}
                animate={undefined}
                transition={undefined}
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-cyan-400/20" />
              
              <motion.div 
                className="absolute top-6 right-6 z-20 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                animate={undefined}
                transition={undefined}
              >
                <motion.span 
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"
                  animate={undefined}
                  transition={undefined}
                />
                <span className="mt-0.5">Live product</span>
              </motion.div>

              <div className="relative z-20 flex-1 flex flex-col">                
                <motion.div 
                  className="w-14 h-14 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 flex items-center justify-center mb-8 relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 z-0" />
                  <Building2 className="w-7 h-7 text-cyan-300 z-10 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                </motion.div>
                
                <h3 className="text-3xl font-black mb-2 flex items-center gap-3 text-cyan-50 tracking-tight">
                  Eduklog
                  <motion.span 
                    className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 tracking-normal font-semibold"
                    animate={undefined}
                    transition={undefined}
                  >
                    v2.4
                  </motion.span>
                </h3>
                
                <p className="text-cyan-400 font-bold mb-5 tracking-widest text-xs uppercase flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-cyan-500" /> 
                  Unified Campus OS
                </p>
                
                <p className="text-slate-200 mb-8 leading-relaxed font-medium text-sm md:text-base flex-1">
                  An audit-proof automation engine that unites academics, finance, and administration. Eliminate silos and gain real-time oversight over your entire campus ecosystem.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {["Academic workflows", "Finance integration", "Admin automation"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-white">
                      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <motion.a
                  href="https://eduklog.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full cursor-pointer py-4 rounded-xl font-bold text-sm bg-cyan-500 border border-cyan-500/30 text-slate-950 transition-all duration-500 flex items-center justify-center gap-2 overflow-hidden relative md:bg-cyan-500/10 md:text-cyan-300 md:group-hover:bg-cyan-500 md:group-hover:text-slate-950"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Visit eduKlog <Zap className="w-4 h-4" />
                  </span>
                </motion.a>
              </div>
              
              {/* Corner tech accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-3xl z-20 m-2 pointer-events-none opacity-100" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 rounded-br-3xl z-20 m-2 pointer-events-none opacity-100" />
            </motion.div>

            {/* CAKlog - In Progress */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
              className="platform-card-sheen relative group rounded-3xl overflow-hidden bg-slate-900/35 border border-indigo-400/30 backdrop-blur-2xl [--tw-backdrop-opacity:opacity(0)] shadow-none hover:shadow-[0_22px_70px_-30px_rgba(99,102,241,0.3)] transition-shadow duration-300 p-8 md:p-12 flex flex-col justify-between min-h-[480px]"
            >
              {/* Glass Background Image Layer */}
              <motion.div 
                className="absolute inset-0 bg-cover bg-center opacity-[0.18] mix-blend-screen"
                style={{ backgroundImage: `url(${FIN_IMG})` }}
                animate={undefined}
                transition={undefined}
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-indigo-400/20" />
              
              <motion.div 
                className="absolute top-6 right-6 z-20 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                animate={undefined}
                transition={undefined}
              >
                <motion.span 
                  className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]"
                  animate={undefined}
                  transition={undefined}
                />
                <span className="mt-0.5">Coming Soon...</span>
              </motion.div>

              <div className="relative z-20 flex-1 flex flex-col">                
                <motion.div 
                  className="w-14 h-14 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-indigo-500/30 flex items-center justify-center mb-8 relative overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 z-0" />
                  <Calculator className="w-7 h-7 text-indigo-300 z-10 drop-shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                </motion.div>
                
                <h3 className="text-3xl font-black mb-2 flex items-center gap-3 text-indigo-50 tracking-tight">
                  Caklog
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
                
                <p className="text-slate-200 mb-8 leading-relaxed font-medium text-sm md:text-base flex-1">
                  Upcoming finance-focused software designed to simplify reporting and day-to-day operational control. Structured to launch with product-led clarity.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {["Advanced operational control", "Simplified reporting", "Audit-ready tracking"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-white">
                      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                        <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <div className="w-full rounded-xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 via-indigo-400/6 to-transparent px-5 py-4 text-sm font-semibold text-indigo-200 flex items-center justify-center gap-3 text-center">
                  <span className="flex items-center gap-3 uppercase tracking-[0.2em] text-[11px] text-indigo-300/90">
                    <span className="h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.7)]" />
                    Launching Next
                  </span>
                </div>
              </div>
              
              {/* Corner tech accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-indigo-500/50 rounded-tl-3xl z-20 m-2 pointer-events-none opacity-100" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-indigo-500/50 rounded-br-3xl z-20 m-2 pointer-events-none opacity-100" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesSection.ref} id="services" className="py-20 sm:py-32 bg-slate-50 border-y border-orange-200/50 relative overflow-hidden" style={DEFERRED_SECTION_STYLE}>
        {/* Sticky Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMTZ2OE0xNiAyMGg4IiBzdHJva2U9InJnYmEoMjQ5LDExNSwyMiwwLjE1KSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==')] opacity-100 bg-center" />
        </div>
        
        {/* Ambient Glows */}
        {serviceEffectsEnabled && <motion.div 
          className="absolute -left-[20%] top-0 w-[50%] h-[100%] bg-gradient-to-br from-orange-400/20 to-transparent blur-[120px] pointer-events-none"
          animate={{ 
            x: [0, 50, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />}
        {serviceEffectsEnabled && <motion.div 
          className="absolute -right-[20%] bottom-0 w-[50%] h-[100%] bg-gradient-to-tl from-orange-500/20 to-transparent blur-[120px] pointer-events-none"
          animate={{ 
            x: [0, -50, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />}

        {/* Animated background particles */}
        {serviceEffectsEnabled && SERVICE_PARTICLES.map((particle, i) => (
          <motion.div
            key={`service-particle-${i}`}
            className="absolute w-2 h-2 bg-orange-500/40 rounded-full z-0"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.1, 0.8, 0.1],
              scale: [1, particle.scale, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">

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
      <section ref={statsSection.ref} className="py-20 sm:py-32 relative overflow-hidden bg-slate-950" style={DEFERRED_SECTION_STYLE}>
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMTZ2OE0xNiAyMGg4IiBzdHJva2U9InJnYmEoNiwxODIsMjEyLDAuMikiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=')] opacity-100 bg-center" />
        </div>

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
              animate={undefined}
              transition={undefined}
            />
            
            <motion.div 
              className="relative z-10 lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >

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
                  animate={undefined}
                  transition={undefined}
                  className="absolute inset-0 border-2 border-dashed border-cyan-500/30 rounded-full"
                />
                <motion.div 
                  animate={undefined}
                  transition={undefined}
                  className="absolute inset-4 border border-indigo-500/40 rounded-full"
                />
                <motion.div 
                  animate={undefined}
                  transition={undefined}
                  className="absolute inset-8 border border-purple-500/30 rounded-full"
                />
                
                {/* Orbiting dots */}
                <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.7)]" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.4)]"
                    animate={statsEffectsEnabled ? {
                      boxShadow: [
                        "0 0 50px rgba(34,211,238,0.4)",
                        "0 0 65px rgba(99,102,241,0.45)",
                        "0 0 50px rgba(34,211,238,0.4)",
                      ],
                      rotate: [0, 360],
                    } : undefined}
                    transition={statsEffectsEnabled ? {
                      boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    } : undefined}
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
      <section ref={ctaSection.ref} className="py-20 sm:py-32 relative border-t border-orange-200/50 bg-slate-50 overflow-hidden" style={DEFERRED_SECTION_STYLE}>
        {/* Sticky Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMTZ2OE0xNiAyMGg4IiBzdHJva2U9InJnYmEoMjQ5LDExNSwyMiwwLjE1KSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==')] opacity-100 bg-center" />
        </div>

        {/* Animated background particles */}
        {ctaEffectsEnabled && CTA_PARTICLES.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-500/40 rounded-full z-0"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.1, 0.8, 0.1],
              scale: [1, particle.scale, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          
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
            Whether you need the comprehensive power of Eduklog, are preparing for Caklog, or require custom architectural solutions.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button 
              className="w-full sm:w-auto px-12 py-5 rounded-full font-bold bg-white border-2 border-orange-200 text-orange-600 shadow-sm relative overflow-hidden group hover:border-orange-400 hover:shadow-xl transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openConsultation}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
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
            </motion.button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}