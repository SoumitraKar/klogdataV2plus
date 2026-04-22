import { useRef, useState } from "react";
import { Linkedin, Github, ChevronRight, Mail, Phone, X, Lock, Users } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import LogoImage from "../../../imports/Klog_Data_Logo_only.png";
import SoumitraImage from "../../../imports/Soumitra.jpg";
import PriyaImage from "../../../imports/Priya.jpg";
import { requestDeferredSections } from "../../utils/deferredSections";

type FlippedState = "contact" | "careers" | "about" | "company" | null;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [flippedState, setFlippedState] = useState<FlippedState>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isFlipped = flippedState !== null;

  const scrollToSection = (sectionId: "products" | "services") => {
    const tryScroll = () => {
      const section = document.getElementById(sectionId);
      if (!section) {
        return false;
      }

      section.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

    if (location.pathname === "/") {
      if (tryScroll()) {
        return;
      }

      requestDeferredSections();

      let attempts = 0;
      const waitForSection = () => {
        if (tryScroll() || attempts >= 20) {
          return;
        }

        attempts += 1;
        window.setTimeout(waitForSection, 50);
      };

      window.setTimeout(waitForSection, 0);
      return;
    }

    navigate("/");

    let attempts = 0;
    const waitForSection = () => {
      if (tryScroll() || attempts >= 20) {
        return;
      }

      attempts += 1;
      window.setTimeout(waitForSection, 50);
    };

    window.setTimeout(waitForSection, 0);
  };

  const openFooterPanel = (panel: Exclude<FlippedState, null>) => {
    setFlippedState(panel);

    if (typeof window !== "undefined" && window.innerWidth < 768) {
      requestAnimationFrame(() => {
        if (!footerRef.current) return;

        const footerTop = footerRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: Math.max(footerTop - 96, 0),
          behavior: "smooth",
        });
      });
    }
  };

  return (
    <div className="w-full relative z-20">
      <motion.footer ref={footerRef} className="relative w-full">
        <div className="relative bg-slate-950 pt-32 pb-8 overflow-hidden border-t border-cyan-900/30 w-full h-full">
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
              {/* Brand Column */}
              <div className="lg:col-span-5">
                <Link to="/" className="flex items-center gap-2 group relative z-50 mb-6 w-fit">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-10 h-10 flex items-center justify-center"
                  >
                    <img src={LogoImage} alt="Klogdata Logo" className="w-full h-full object-contain" />
                  </motion.div>
                  <span className="brand-wordmark text-xl font-bold">
                    Klog<span className="brand-wordmark-accent">data</span>.
                  </span>
                </Link>
                <motion.p 
                  className="text-slate-400 mb-8 leading-relaxed text-lg"
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
                    { icon: Github, href: "#", disabled: true },
                    { icon: Linkedin, href: "https://www.linkedin.com/company/kairav-digital", external: true },
                    { icon: Mail, href: "mailto:info@klogdata.com" },
                    { icon: Phone, href: "tel:+918073338738" }
                  ].map((social, i) => (
                    social.disabled ? (
                      <div
                        key={i}
                        aria-disabled="true"
                        className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-600 opacity-60 cursor-not-allowed"
                      >
                        <social.icon className="w-5 h-5" />
                      </div>
                    ) : (
                      <motion.a 
                        key={i} 
                        href={social.href}
                        target={social.external ? "_blank" : undefined}
                        rel={social.external ? "noreferrer" : undefined}
                        className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-cyan-950 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-300 shadow-[0_0_0_rgba(34,211,238,0)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] cursor-pointer"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    )
                  ))}
                </motion.div>
              </div>

              {/* Spacer Column */}
              <div className="hidden lg:block lg:col-span-1"></div>

              {/* Link Columns */}
              {[
                { 
                  title: "Platforms", 
                  links: ["Eduklog", "Caklog"] 
                },
                { 
                  title: "Services", 
                  links: ["System Integration", "Data Analytics", "Custom Architecture", "Cloud Migration"] 
                },
                { 
                  title: "Company", 
                  links: ["Contact Us", "Careers", "About Klogdata", "The Team"] 
                }
              ].map((col, idx) => (
                <div key={idx} className="lg:col-span-2 lg:col-start-auto">
                  <motion.h4 
                    className="font-bold mb-8 tracking-wider uppercase text-sm flex items-center gap-2 text-[var(--color-cyan-500)]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * (idx + 1) }}
                  >
                    {col.title}
                  </motion.h4>
                  <ul className="space-y-4">
                    {col.links.map((link, linkIdx) => {
                      const isCompanyInfo = link === "About Klogdata";
                      const isContact = link === "Contact Us";
                      const isCareers = link === "Careers";
                      const isAbout = link === "The Team";
                      const isPlatformLink = col.title === "Platforms";
                      const isServiceLink = col.title === "Services";
                      const isFlippable = isCompanyInfo || isContact || isCareers || isAbout;

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
                                if (isCompanyInfo) openFooterPanel("company");
                                else if (isContact) openFooterPanel("contact");
                                else if (isCareers) openFooterPanel("careers");
                                else if (isAbout) openFooterPanel("about");
                              }}
                              className="text-slate-400 hover:text-cyan-400 text-base font-medium transition-colors flex items-center gap-2 group relative w-full text-left cursor-pointer"
                            >
                              <ChevronRight className="w-4 h-4 opacity-0 absolute -left-6 group-hover:opacity-100 group-hover:left-[-1.5rem] transition-all duration-300 text-cyan-500" />
                              <span className="group-hover:translate-x-2 transition-transform duration-300">{link}</span>
                            </button>
                          ) : isPlatformLink || isServiceLink ? (
                            <button
                              onClick={() => scrollToSection(isPlatformLink ? "products" : "services")}
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
                © {currentYear} <b>Kairav Digital Pvt. Ltd.</b> All rights reserved.
              </motion.p>
              <motion.div 
                className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-slate-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <span className="">Klog Data is the digital product and consulting brand.</span>
              </motion.div>
            </div>
          </div>

          {/* Gigantic Cyber Watermark */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full overflow-hidden flex justify-center pointer-events-none z-0">
            <span className="text-[18vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-700/55 to-slate-950/95 whitespace-nowrap leading-none select-none opacity-90">
              KLOGDATA
            </span>
          </div>
        </div>
      </motion.footer>

      <AnimatePresence>
        {isFlipped && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-30 flex items-stretch"
          >
            <div
              className="absolute inset-0 bg-slate-950/88 backdrop-blur-sm"
              onClick={() => setFlippedState(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.985 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="relative z-10 m-2 sm:m-3 w-full rounded-[1.5rem] border border-cyan-900/40 bg-slate-950/96 shadow-[0_24px_60px_rgba(2,6,23,0.5)] overflow-hidden"
            >
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#06b6d41a_1px,transparent_1px),linear-gradient(to_bottom,#06b6d41a_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
              <div className="absolute left-0 bottom-0 w-[360px] h-[360px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3" />
              <div className="absolute right-0 top-0 w-[360px] h-[360px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />

              <div className="relative z-10 h-full overflow-y-auto px-3 py-4 sm:px-4 md:px-6 md:py-5 flex flex-col items-center">
                <div className="w-full flex justify-end mb-5 sm:mb-3">
                  <button
                    onClick={() => setFlippedState(null)}
                    className="px-4 py-2 rounded-full bg-slate-950 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300 flex items-center gap-2 cursor-pointer font-bold tracking-widest text-[10px] uppercase"
                  >
                    <X className="w-4 h-4" />
                    Close Panel
                  </button>
                </div>

                {flippedState === "contact" && (
                  <div className="w-full max-w-6xl flex flex-col items-center">
                    <div className="text-center mb-5">
                      <h3 className="text-2xl md:text-4xl font-black text-cyan-300 tracking-tight uppercase">
                        Communication Link Established
                      </h3>
                      <p className="text-slate-400 mt-2 text-sm md:text-base max-w-2xl mx-auto">
                        Secure vectors are open. Choose your preferred channel to interface directly with our systems.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full mb-2">
                      <a
                        href="tel:+918073338738"
                        className="flex flex-col items-center text-center gap-3 p-4 sm:p-5 rounded-2xl bg-slate-900/50 border border-slate-800 relative overflow-hidden cursor-pointer transition-colors duration-300 hover:border-cyan-500/40"
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />
                        <div className="w-12 h-12 rounded-full bg-cyan-950/50 border border-cyan-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.2)] z-10">
                          <Phone className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div className="z-10 mt-1">
                          <span className="block text-base sm:text-lg md:text-xl font-bold text-white tracking-widest mb-1 whitespace-normal sm:whitespace-nowrap">+91 80733 38738</span>
                          <span className="text-xs text-cyan-500 uppercase tracking-widest font-bold">Global Support</span>
                        </div>
                      </a>

                      <a
                        href="tel:+917008260267"
                        className="flex flex-col items-center text-center gap-3 p-4 sm:p-5 rounded-2xl bg-slate-900/50 border border-slate-800 relative overflow-hidden cursor-pointer transition-colors duration-300 hover:border-indigo-500/40"
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
                        <div className="w-12 h-12 rounded-full bg-indigo-950/50 border border-indigo-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)] z-10">
                          <Phone className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div className="z-10 mt-1">
                          <span className="block text-base sm:text-lg md:text-xl font-bold text-white tracking-widest mb-1 whitespace-normal sm:whitespace-nowrap">+91 70082 60267</span>
                          <span className="text-xs text-indigo-500 uppercase tracking-widest font-bold">Enterprise Sales</span>
                        </div>
                      </a>

                      <a
                        href="mailto:info@klogdata.com"
                        className="flex flex-col items-center text-center gap-3 p-4 sm:p-5 rounded-2xl bg-slate-900/50 border border-slate-800 relative overflow-hidden cursor-pointer transition-colors duration-300 hover:border-purple-500/40"
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
                        <div className="w-12 h-12 rounded-full bg-purple-950/50 border border-purple-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.2)] z-10">
                          <Mail className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="z-10 mt-1">
                          <span className="block text-sm sm:text-base md:text-lg font-bold text-white tracking-widest mb-1 break-all sm:break-normal transition-colors hover:text-purple-300">info@klogdata.com</span>
                          <span className="text-xs text-purple-500 uppercase tracking-widest font-bold">Direct Comms</span>
                        </div>
                      </a>
                    </div>
                  </div>
                )}

                {flippedState === "company" && (
                  <div className="w-full max-w-6xl flex flex-col items-center">
                    <div className="text-center mb-5">
                      <h3 className="text-2xl md:text-4xl font-black text-cyan-300 tracking-tight uppercase">
                        About Klogdata
                      </h3>
                      <p className="text-slate-400 mt-2 text-sm md:text-base mx-auto">
                        Klogdata is the operating brand through which we build modern platforms and digital transformation solutions.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-5xl mx-auto mb-4">
                      <div className="rounded-2xl border border-cyan-900/40 bg-slate-900/50 p-5 text-left relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/8 to-transparent pointer-events-none" />
                        <div className="relative z-10">
                          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-400 mb-3">Registered Entity</p>
                          <h4 className="text-white text-xl font-bold mb-2">Kairav Digital Pvt. Ltd.</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            Klogdata is a brand of Kairav Digital Pvt. Ltd., focused on delivering software platforms and technology services for institutions and enterprises.
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-indigo-900/40 bg-slate-900/50 p-5 text-left relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/8 to-transparent pointer-events-none" />
                        <div className="relative z-10">
                          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-indigo-300 mb-3">Mission</p>
                          <h4 className="text-white text-xl font-bold mb-2">Build operational clarity</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            Our mission is to simplify complex operations by building dependable digital systems that unify workflows, reduce friction, and turn scattered data into usable intelligence.
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-emerald-900/40 bg-slate-900/50 p-5 text-left relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/8 to-transparent pointer-events-none" />
                        <div className="relative z-10">
                          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300 mb-3">Vision</p>
                          <h4 className="text-white text-xl font-bold mb-2">Enable smarter institutions</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            Our vision is to help organizations operate with precision, transparency, and speed through intelligent platforms that scale with their growth.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {flippedState === "careers" && (
                  <div className="w-full max-w-6xl flex flex-col items-center">
                    <div className="text-center mb-5">
                      <h3 className="text-2xl md:text-4xl font-black text-orange-400 tracking-tight uppercase">
                        Personnel Matrix
                      </h3>
                      <p className="text-slate-400 mt-2 text-sm md:text-base max-w-2xl mx-auto">
                        System optimization protocol active.
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center mb-2 bg-slate-900/40 border border-slate-800/80 p-5 sm:p-7 rounded-3xl w-full max-w-xl relative overflow-hidden">
                      <h4 className="text-xl font-bold text-white tracking-widest uppercase mb-3 text-center">
                        Recruitment Locked
                      </h4>
                      <p className="text-slate-400 text-center max-w-md leading-relaxed text-sm md:text-base">
                        Our current operational capacity is at <span className="text-red-400 font-bold">100%</span>. We are not actively recruiting new operatives or architects at this moment. Check back during the next system expansion cycle.
                      </p>
                    </div>
                  </div>
                )}

                {flippedState === "about" && (
                  <div className="w-full max-w-6xl flex flex-col items-center">
                    <div className="text-center mb-5">
                      <h3 className="text-2xl md:text-4xl font-black text-emerald-400 tracking-tight uppercase">
                        Command Structure
                      </h3>
                      <p className="text-slate-400 mt-2 text-sm md:text-base max-w-2xl mx-auto">
                        The primary architects behind the Klogdata network.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto mb-4">
                      <div className="bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-colors duration-300 rounded-2xl flex items-stretch text-left group overflow-hidden">
                        <div className="w-[5.15rem] min-w-[5.15rem] self-stretch bg-emerald-950/50 border-r border-emerald-500/30 overflow-hidden">
                          <img src={PriyaImage} alt="Bishnupriya" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>
                        <div className="p-4">
                          <h4 className="text-white font-bold text-xl mb-1">Bishnupriya</h4>
                          <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-2">Chief Executive Officer</p>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            10+ years of expertise in building scalable, automated enterprise workflows. From driving UiPath innovation at Fujitsu to enterprise RPA development at Persistent Systems and TCS.
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 transition-colors duration-300 rounded-2xl flex items-stretch text-left group overflow-hidden">
                        <div className="w-[5.15rem] min-w-[5.15rem] self-stretch bg-teal-950/50 border-r border-teal-500/30 overflow-hidden">
                          <img src={SoumitraImage} alt="Soumitra" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>
                        <div className="p-4">
                          <h4 className="text-white font-bold text-xl mb-1">Soumitra</h4>
                          <p className="text-teal-400 text-[10px] font-black uppercase tracking-widest mb-2">Chief Technology Officer</p>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            12+ years of expertise in building scalable, product-led software. From driving technical innovation at Kongsberg to enterprise development at IBM and Wipro.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full max-w-4xl mx-auto bg-slate-900/30 border border-slate-800/50 p-4 rounded-2xl text-center mb-2 flex items-center flex-col sm:flex-row gap-3 sm:text-left hover:border-cyan-500/30 transition-colors">
                      <div className="p-2.5 bg-slate-900 rounded-full border border-slate-800">
                        <Users className="w-6 h-6 text-cyan-500" />
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed flex-1">
                        Our core collective consists of elite engineers and system architects. We operate in perfect synchronization to build the future of intelligent infrastructure.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}