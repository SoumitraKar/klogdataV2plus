import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import LogoImage from "../../../imports/Klog_Data_Logo_only.png";

type NavbarProps = {
  onOpenConsultation: () => void;
};

export function Navbar({ onOpenConsultation }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "#products" },
    { name: "Services", href: "#services" },
  ];
  const consultationButtonClassName = "inline-flex items-center justify-center rounded-full border border-cyan-400/30 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(99,102,241,0.2)_55%,rgba(244,63,94,0.14))] px-5 py-2.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(8,47,73,0.3)] transition-all duration-300 hover:border-cyan-300/50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_14px_30px_rgba(8,47,73,0.38)]";

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);

    if (href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent ${
        scrolled ? "bg-slate-950/95 md:bg-slate-950/80 md:backdrop-blur-md border-white/10 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group relative z-50 cursor-pointer">
          <motion.div 
            className="w-10 h-10 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <img src={LogoImage} alt="Klogdata Logo" className="w-full h-full object-contain" />
          </motion.div>
          <span className="brand-wordmark text-xl font-bold">
            Klog<span className="brand-wordmark-accent">data</span>.
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors relative cursor-pointer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.name}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
          <button onClick={onOpenConsultation} className={`${consultationButtonClassName} cursor-pointer`}>
            Schedule a Consultation
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 p-2 text-slate-300 hover:text-white cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 bg-slate-900 border-b border-white/10 pt-20 pb-6 px-6 flex flex-col gap-4 shadow-2xl md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-lg font-medium text-slate-300 hover:text-cyan-400 text-left py-2 border-b border-white/5 cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className={`${consultationButtonClassName} mt-4 w-full py-3 text-base cursor-pointer`}
            >
              Schedule a Consultation
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
