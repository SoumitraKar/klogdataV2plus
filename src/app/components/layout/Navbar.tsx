import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import LogoImage from "../../../imports/Klog_Data_Logo_only.png";
import { scrollToSection, scrollToTop } from "../../utils/navigation";

type NavbarProps = {
  onOpenConsultation: () => void;
};

export function Navbar({ onOpenConsultation }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    if (mobileMenuOpen) {
      setMobileMenuMounted(true);
      return;
    }

    if (mobileMenuMounted) {
      closeTimerRef.current = window.setTimeout(() => {
        setMobileMenuMounted(false);
        closeTimerRef.current = null;
      }, 220);
    }
  }, [mobileMenuMounted, mobileMenuOpen]);

  useEffect(() => () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
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
      scrollToTop();
      return;
    }

    if (href.startsWith("#")) {
      scrollToSection(href.substring(1));
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent ${
        scrolled ? "bg-slate-950/95 md:bg-slate-950/80 md:backdrop-blur-md border-white/10 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-2 group relative z-50 cursor-pointer"
        >
          <div className="flex h-10 w-10 items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <img src={LogoImage} alt="Klogdata Logo" className="w-full h-full object-contain" />
          </div>
          <span className="brand-wordmark text-xl font-bold">
            Klog<span className="brand-wordmark-accent">data</span>.
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="group relative cursor-pointer text-sm font-medium text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:text-cyan-400 active:scale-95"
            >
              {link.name}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-cyan-400 to-indigo-500 transition-transform duration-300 group-hover:scale-x-100" />
            </button>
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
      {mobileMenuMounted ? (
        <div
          className={`absolute top-0 left-0 right-0 border-b border-white/10 bg-slate-900 px-6 pt-20 pb-6 shadow-2xl transition-all duration-200 md:hidden ${
            mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4">
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
          </div>
        </div>
      ) : null}
    </header>
  );
}
