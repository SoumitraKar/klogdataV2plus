import { useState } from "react";
import { Twitter, Linkedin, Github, ChevronRight, Mail, Phone, X, Lock, Briefcase, Cpu, Users } from "lucide-react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import LogoImage from "../../../imports/Klog_Data_Logo_only.png";

type FlippedState = "contact" | "careers" | "about" | null;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [flippedState, setFlippedState] = useState<FlippedState>(null);

  const isFlipped = flippedState !== null;

  return (
    <div style={{ perspective: "2000px" }} className="w-full relative z-20">
      <motion.footer 
        className="relative w-full min-h-[600px]"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ 
          rotateX: isFlipped ? -180 : 0,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 14, mass: 1.2 }}
      >
        {/* FRONT FACE */}
        <div 
          className="relative bg-slate-950 pt-32 pb-8 overflow-hidden border-t border-cyan-900/30 w-full h-full"
          style={{ 
            backfaceVisibility: "hidden",
            pointerEvents: isFlipped ? "none" : "auto" 
          }}
        >
          {/* Tech Grid Background */}
          <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#06b6d41a_1px,transparent_1px),linear-gradient(to_bottom,#06b6d41a_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          
          {/* Top Edge Glowing Laser */}
          <motion.div 
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-full"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />

          {/* Ambient Nebula Glows */}
          <motion.div 
            className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute right-0 top-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
              {/* Brand Column */}
              <div className="lg:col-span-4">
                <Link to="/" className="flex items-center gap-3 mb-6 group cursor-pointer w-fit">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-300 p-2"
                  >
                    <img src={LogoImage} alt="Klogdata Logo" className="w-full h-full object-contain" />
                  </motion.div>
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-black text-white tracking-tight group-hover:text-cyan-300 transition-colors"
                  >
                    KLOGDATA
                  </motion.span>
                </Link>
                <motion.p 
                  className="text-slate-400 mb-8 max-w-sm leading-relaxed text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  Engineering the operating layer for next-generation institutions and enterprises. We unite isolated domains into seamless, intelligent platforms.
                </motion.p>
                
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {[
                    { icon: Twitter, href: "#" },
                    { icon: Github, href: "#" },
                    { icon: Linkedin, href: "#" },
                    { icon: Mail, href: "#" }
                  ].map((social, i) => (
                    <motion.a 
                      key={i} 
                      href={social.href}
                      className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-cyan-950 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-300 shadow-[0_0_0_rgba(34,211,238,0)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </motion.div>
              </div>

              {/* Spacer Column */}
              <div className="hidden lg:block lg:col-span-2"></div>

              {/* Link Columns */}
              {[
                { 
                  title: "Platforms", 
                  links: ["Eduklog OS", "CAKlog Finance", "Enterprise Architecture", "Security Matrix"] 
                },
                { 
                  title: "Company", 
                  links: ["About Klogdata", "Careers", "Press & Media", "Contact Us"] 
                },
                { 
                  title: "Services", 
                  links: ["System Integration", "Data Analytics", "Custom Architecture", "Cloud Migration"] 
                }
              ].map((col, idx) => (
                <div key={idx} className="lg:col-span-2 lg:col-start-auto">
                  <motion.h4 
                    className="text-white font-bold mb-8 tracking-wider uppercase text-sm flex items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * (idx + 1) }}
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]" />
                    {col.title}
                  </motion.h4>
                  <ul className="space-y-4">
                    {col.links.map((link, linkIdx) => {
                      const isContact = link === "Contact Us";
                      const isCareers = link === "Careers";
                      const isAbout = link === "About Klogdata";
                      const isFlippable = isContact || isCareers || isAbout;

                      return (
                        <motion.li 
                          key={linkIdx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * (idx + 1) + (0.05 * linkIdx) }}
                        >
                          {isFlippable ? (
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                if (isContact) setFlippedState("contact");
                                else if (isCareers) setFlippedState("careers");
                                else if (isAbout) setFlippedState("about");
                              }}
                              className="text-slate-400 hover:text-cyan-400 text-base font-medium transition-colors flex items-center gap-2 group relative w-full text-left cursor-pointer"
                            >
                              <ChevronRight className="w-4 h-4 opacity-0 absolute -left-6 group-hover:opacity-100 group-hover:left-[-1.5rem] transition-all duration-300 text-cyan-500" />
                              <span className="group-hover:translate-x-2 transition-transform duration-300">{link}</span>
                            </button>
                          ) : (
                            <a href="#" className="text-slate-400 hover:text-cyan-400 text-base font-medium transition-colors flex items-center gap-2 group relative inline-flex">
                              <ChevronRight className="w-4 h-4 opacity-0 absolute -left-6 group-hover:opacity-100 group-hover:left-[-1.5rem] transition-all duration-300 text-cyan-500" />
                              <span className="group-hover:translate-x-2 transition-transform duration-300">{link}</span>
                            </a>
                          )}
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-cyan-900/30 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <motion.p 
                className="text-slate-500 text-sm font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                © {currentYear} Klogdata Inc. All rights reserved. System operations normal.
              </motion.p>
              <motion.div 
                className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-slate-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
                <span className="w-1 h-1 rounded-full bg-slate-800" />
                <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
                <span className="w-1 h-1 rounded-full bg-slate-800" />
                <a href="#" className="hover:text-cyan-400 transition-colors">Cookie Settings</a>
              </motion.div>
            </div>
          </div>

          {/* Gigantic Cyber Watermark */}
          <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full overflow-hidden flex justify-center pointer-events-none z-0">
            <span className="text-[18vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-800/40 to-slate-950 whitespace-nowrap leading-none select-none">
              KLOGDATA
            </span>
          </div>
        </div>

        {/* BACK FACE (DYNAMIC CONTENT) */}
        <div 
          className="absolute inset-0 bg-slate-950 border-t border-cyan-900/30 overflow-y-auto overflow-x-hidden pt-12 pb-8 px-4 sm:px-6"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateX(180deg)",
            pointerEvents: isFlipped ? "auto" : "none"
          }}
        >
          <div className="min-h-full flex flex-col items-center justify-start w-full">
            {/* Back Face Grid */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#06b6d41a_1px,transparent_1px),linear-gradient(to_bottom,#06b6d41a_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
            
            {/* Ambient Glows */}
            <motion.div 
              className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center flex-1 min-h-[500px]">
              <div className="flex-1 min-h-[2rem]" />
              <AnimatePresence mode="wait">
                {flippedState === "contact" && (
                  <motion.div 
                    key="contact"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col items-center"
                >
                  <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 tracking-tight uppercase">
                      Communication Link Established
                    </h3>
                    <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
                      Secure vectors are open. Choose your preferred channel to interface directly with our systems.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
                    <div className="flex flex-col items-center text-center gap-4 group p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="w-16 h-16 rounded-full bg-cyan-950/50 border border-cyan-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-all duration-500 z-10">
                         <Phone className="w-7 h-7 text-cyan-400" />
                      </div>
                      <div className="z-10 mt-2">
                        <span className="block text-lg sm:text-xl md:text-2xl font-bold text-white tracking-widest mb-2 whitespace-normal sm:whitespace-nowrap">+1 (800) 555-0199</span>
                        <span className="text-xs text-cyan-500 uppercase tracking-widest font-bold">Global Support</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center gap-4 group p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="w-16 h-16 rounded-full bg-indigo-950/50 border border-indigo-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] group-hover:scale-110 transition-all duration-500 z-10">
                         <Phone className="w-7 h-7 text-indigo-400" />
                      </div>
                      <div className="z-10 mt-2">
                        <span className="block text-lg sm:text-xl md:text-2xl font-bold text-white tracking-widest mb-2 whitespace-normal sm:whitespace-nowrap">+1 (800) 555-0299</span>
                        <span className="text-xs text-indigo-500 uppercase tracking-widest font-bold">Enterprise Sales</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center gap-4 group p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/80 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="w-16 h-16 rounded-full bg-purple-950/50 border border-purple-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-all duration-500 z-10">
                         <Mail className="w-7 h-7 text-purple-400" />
                      </div>
                      <div className="z-10 mt-2">
                        <span className="block text-base sm:text-lg md:text-xl font-bold text-white tracking-widest mb-2 break-all sm:break-normal">hello@klogdata.com</span>
                        <span className="text-xs text-purple-500 uppercase tracking-widest font-bold">Direct Comms</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {flippedState === "careers" && (
                <motion.div 
                  key="careers"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col items-center"
                >
                  <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500 tracking-tight uppercase">
                      Personnel Matrix
                    </h3>
                    <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
                      System optimization protocol active. 
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center mb-12 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-12 rounded-3xl w-full max-w-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-500/5 pointer-events-none" />
                    
                    <div className="w-24 h-24 rounded-full border border-red-500/30 flex items-center justify-center relative mb-8 shadow-[0_0_40px_rgba(239,68,68,0.15)]">
                      <div className="absolute inset-0 rounded-full border-t-2 border-red-500/80 animate-spin" style={{ animationDuration: '3s' }} />
                      <div className="absolute inset-0 rounded-full border-b-2 border-orange-500/50 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
                      <Lock className="w-8 h-8 text-red-400" />
                    </div>
                    
                    <h4 className="text-2xl font-bold text-white tracking-widest uppercase mb-4 text-center">
                      Recruitment Locked
                    </h4>
                    <p className="text-slate-400 text-center max-w-md leading-relaxed">
                      Our current operational capacity is at <span className="text-red-400 font-bold">100%</span>. We are not actively recruiting new operatives or architects at this moment. Check back during the next system expansion cycle.
                    </p>
                  </div>
                </motion.div>
              )}

              {flippedState === "about" && (
                <motion.div 
                  key="about"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col items-center"
                >
                  <div className="text-center mb-10">
                    <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 tracking-tight uppercase">
                      Command Structure
                    </h3>
                    <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
                      The primary architects behind the Klogdata network.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto mb-6">
                    {/* CEO Card */}
                    <div className="bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-300 p-6 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left group">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Briefcase className="w-8 h-8 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-2xl mb-1">Elena Rostova</h4>
                        <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-3">Chief Executive Officer</p>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          15+ years scaling enterprise data systems. Former VP of engineering at Tier-1 tech conglomerates. Visionary behind our seamless integration mandate.
                        </p>
                      </div>
                    </div>

                    {/* CTO Card */}
                    <div className="bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 hover:shadow-[0_0_30px_rgba(20,184,166,0.1)] transition-all duration-300 p-6 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left group">
                      <div className="w-16 h-16 rounded-2xl bg-teal-950/50 border border-teal-500/50 flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Cpu className="w-8 h-8 text-teal-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-2xl mb-1">Victor Chen</h4>
                        <p className="text-teal-400 text-xs font-black uppercase tracking-widest mb-3">Chief Technology Officer</p>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          20+ years in distributed systems & cryptography. Architect of the core Nexus Protocol. Leads our global grid of specialized engineers.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Team Note */}
                  <div className="w-full max-w-4xl mx-auto bg-slate-900/30 border border-slate-800/50 p-6 rounded-2xl text-center mb-8 flex items-center flex-col sm:flex-row gap-4 sm:text-left hover:border-cyan-500/30 transition-colors">
                    <div className="p-3 bg-slate-900 rounded-full border border-slate-800">
                      <Users className="w-6 h-6 text-cyan-500" />
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed flex-1">
                      Our core collective consists of elite engineers, cryptographers, and system architects distributed across global nodes. We operate in perfect synchronization to build the future of intelligent infrastructure.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex-1 min-h-[2rem]" />
            {/* Universal Terminate Button */}
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              onClick={() => setFlippedState(null)}
              className="px-6 py-4 sm:px-8 sm:py-4 rounded-full bg-slate-950 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] flex items-center gap-3 transition-all duration-300 group font-bold tracking-widest text-[10px] sm:text-xs uppercase w-full sm:w-auto justify-center"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Terminate Connection
            </motion.button>
          </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}