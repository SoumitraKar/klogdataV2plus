import { Suspense, lazy, useEffect, useState, type CSSProperties } from "react";
import { useOutletContext } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { ScrollProgress } from "../components/ScrollProgress";
import { useSectionActivity } from "../components/useSectionActivity";
import { useIsMobile } from "../components/ui/use-mobile";
import type { RootOutletContext } from "../components/layout/Root";
import { scheduleIdleWork } from "../utils/schedule";

let homeDeferredSectionsPromise: Promise<typeof import("./HomeDeferredSections")> | null = null;

const loadHomeDeferredSections = () => {
  homeDeferredSectionsPromise ??= import("./HomeDeferredSections");
  return homeDeferredSectionsPromise;
};

const HomeDeferredSections = lazy(async () => {
  const module = await loadHomeDeferredSections();
  return { default: module.HomeDeferredSections };
});

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

const DEFERRED_SECTION_STYLE: CSSProperties = {
  containIntrinsicSize: "1200px",
  contentVisibility: "auto",
};

export function Home() {
  const { openConsultation } = useOutletContext<RootOutletContext>();
  const isMobile = useIsMobile();
  const isSmallScreen = isMobile;
  const [overlayDetailsReady, setOverlayDetailsReady] = useState(false);
  const [decorativeEffectsReady, setDecorativeEffectsReady] = useState(false);
  const [deferredSectionsReady, setDeferredSectionsReady] = useState(false);
  const heroSection = useSectionActivity<HTMLElement>();

  useEffect(() => {
    let overlayTimeoutId = 0;
    const overlayDelay = isMobile ? 900 : 250;
    const effectsDelay = isMobile ? 1800 : 700;
    const idleTimeout = isMobile ? 2200 : 1200;

    setOverlayDetailsReady(false);
    setDecorativeEffectsReady(false);
    overlayTimeoutId = globalThis.setTimeout(() => setOverlayDetailsReady(true), overlayDelay);

    const cancelIdleWork = scheduleIdleWork(() => setDecorativeEffectsReady(true), {
      fallbackDelay: effectsDelay,
      preferTimeout: isMobile,
      timeout: idleTimeout,
    });

    return () => {
      if (overlayTimeoutId) {
        globalThis.clearTimeout(overlayTimeoutId);
      }

      cancelIdleWork();
    };
  }, [isMobile]);

  useEffect(() => {
    let timeoutId = 0;
    let frameOneId = 0;
    let frameTwoId = 0;
    let cancelled = false;

    const enableDeferredSections = () => {
      loadHomeDeferredSections().finally(() => {
        if (!cancelled) {
          setDeferredSectionsReady(true);
        }
      });
    };

    if (!isSmallScreen) {
      setDeferredSectionsReady(true);
      return () => {
        cancelled = true;
      };
    }

    setDeferredSectionsReady(false);
    frameOneId = window.requestAnimationFrame(() => {
      frameTwoId = window.requestAnimationFrame(enableDeferredSections);
    });
    timeoutId = window.setTimeout(enableDeferredSections, 600);

    return () => {
      cancelled = true;
      if (frameOneId) {
        window.cancelAnimationFrame(frameOneId);
      }
      if (frameTwoId) {
        window.cancelAnimationFrame(frameTwoId);
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [isSmallScreen]);

  const deferredSectionStyle = isMobile ? undefined : DEFERRED_SECTION_STYLE;
  const heroEffectsEnabled = decorativeEffectsReady && heroSection.isNear;
  const heroParticles = isSmallScreen ? HERO_PARTICLES.slice(0, 3) : HERO_PARTICLES;
  const heroStreamCount = isSmallScreen ? 2 : 4;
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <ScrollProgress />

      <section ref={heroSection.ref} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950 z-10" />
          <motion.div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-[1] ${isSmallScreen ? "h-[82vw] w-[82vw] bg-[radial-gradient(circle,rgba(34,211,238,0.2)_0%,rgba(99,102,241,0.16)_42%,rgba(15,23,42,0)_72%)]" : "h-[62vw] w-[62vw] bg-[radial-gradient(circle,rgba(34,211,238,0.24)_0%,rgba(99,102,241,0.18)_38%,rgba(168,85,247,0.12)_56%,rgba(15,23,42,0)_74%)]"}`}
            animate={heroEffectsEnabled ? {
              scale: isSmallScreen ? [1, 1.05, 1] : [1, 1.08, 1],
              opacity: isSmallScreen ? [0.7, 0.95, 0.7] : [0.75, 1, 0.75],
            } : undefined}
            transition={heroEffectsEnabled ? { duration: 10, repeat: Infinity, ease: "easeInOut" } : undefined}
          />

          <>
            <motion.div
              className={`absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full z-0 mix-blend-screen ${isSmallScreen ? "w-[58vw] h-[58vw] bg-cyan-500/30 blur-[90px]" : "w-[50vw] h-[50vw] bg-cyan-500/40 blur-[130px]"}`}
              animate={heroEffectsEnabled ? {
                scale: [1, 1.4, 1],
                opacity: isSmallScreen ? [0.35, 0.55, 0.35] : [0.5, 0.8, 0.5],
                x: [0, 50, 0],
                y: [0, 30, 0],
              } : undefined}
              transition={heroEffectsEnabled ? { duration: 15, repeat: Infinity, ease: "easeInOut" } : undefined}
            />
            <motion.div
              className={`absolute bottom-1/4 right-1/4 rounded-full z-0 mix-blend-screen ${isSmallScreen ? "w-[52vw] h-[52vw] bg-indigo-500/28 blur-[82px]" : "w-[40vw] h-[40vw] bg-indigo-500/40 blur-[120px]"}`}
              animate={heroEffectsEnabled ? {
                scale: [1, 1.5, 1],
                opacity: isSmallScreen ? [0.3, 0.5, 0.3] : [0.4, 0.9, 0.4],
                x: [0, -40, 0],
                y: [0, -40, 0],
              } : undefined}
              transition={heroEffectsEnabled ? { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 } : undefined}
            />
            <motion.div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-0 mix-blend-screen ${isSmallScreen ? "w-[74vw] h-[42vw] bg-purple-500/22 blur-[92px]" : "w-[60vw] h-[30vw] bg-purple-500/30 blur-[140px]"}`}
              animate={undefined}
              transition={undefined}
            />
            {overlayDetailsReady ? (
              <motion.div
                className={`absolute inset-0 z-[5] ${isSmallScreen ? "opacity-40" : "opacity-60"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isSmallScreen ? 0.25 : 0.35 }}
                transition={{ duration: 1.4 }}
              >
                <div className={`absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.15)_1px,transparent_1px)] ${isSmallScreen ? "bg-[size:3.5rem_3.5rem]" : "bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"}`} />
                <div className={`absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.1)_1px,transparent_1px)] ${isSmallScreen ? "bg-[size:1.25rem_1.25rem] opacity-35" : "bg-[size:1rem_1rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-50"}`}
                />
              </motion.div>
            ) : null}
          </>

          {heroEffectsEnabled && [...Array(heroStreamCount)].map((_, i) => {
            const top = 5 + (i * 17) % 90;
            const delay = (i * 0.7) % 5;
            const duration = 3 + (i % 5);
            const opacity = 0.3 + (i % 3) * 0.2;
            const isBlue = i % 2 === 0;

            return (
              <motion.div
                key={`stream-${i}`}
                className={`absolute h-[2px] w-1/4 z-0 ${isBlue ? "bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]" : "bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_15px_#6366f1]"}`}
                style={{ top: `${top}%`, left: "-50%", opacity }}
                animate={{ left: ["-50%", "150%"] }}
                transition={{ duration, repeat: Infinity, ease: "linear", delay }}
              />
            );
          })}

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] flex items-center justify-center pointer-events-none z-0">
            {!isSmallScreen ? (
              <motion.div
                className="absolute w-1/2 h-1/2 origin-bottom-right rounded-tl-full bg-gradient-to-br from-cyan-500/10 to-transparent border-t-2 border-l-2 border-cyan-400/40 blur-[1px]"
                style={{ bottom: "50%", right: "50%" }}
                animate={undefined}
                transition={undefined}
              />
            ) : null}

            {(isSmallScreen ? [1] : [1, 2]).map((ring) => (
              <div
                key={`ring-${ring}`}
                className={isSmallScreen ? "absolute rounded-full border border-cyan-500/20" : "absolute rounded-full border-[1.5px] border-cyan-500/30 mix-blend-screen shadow-[0_0_20px_rgba(6,182,212,0.2)_inset,0_0_20px_rgba(6,182,212,0.2)]"}
                style={{ width: `${ring * 20}%`, height: `${ring * 20}%`, opacity: isSmallScreen ? 0.3 : 0.45 }}
              />
            ))}
          </div>

          {heroEffectsEnabled && heroParticles.map((particle, i) => {
            const isCyan = i % 3 !== 0;

            return (
              <motion.div
                key={`particle-${i}`}
                className={`absolute w-1.5 h-1.5 rounded-full z-0 ${isCyan ? "bg-cyan-400 shadow-[0_0_10px_#22d3ee]" : "bg-indigo-400 shadow-[0_0_10px_#818cf8]"}`}
                style={{ left: `${particle.left}%`, top: `${particle.top}%` }}
                animate={{
                  y: [0, -120, 0],
                  x: [0, particle.x, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0],
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
              <motion.button className="w-full cursor-pointer sm:w-auto px-8 py-4 rounded-full font-bold bg-white text-slate-900 flex items-center justify-center gap-2 group relative overflow-hidden">
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
                className={`w-full cursor-pointer sm:w-auto px-8 py-4 rounded-full font-bold border border-white/10 text-white relative overflow-hidden group transition-colors duration-200 hover:bg-white/10 ${isSmallScreen ? "bg-white/10" : "bg-white/5 backdrop-blur-md"}`}
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

      {deferredSectionsReady ? (
        <Suspense fallback={null}>
          <HomeDeferredSections
            ctaImageReady={overlayDetailsReady}
            decorativeEffectsReady={decorativeEffectsReady}
            deferredSectionStyle={deferredSectionStyle}
            isSmallScreen={isSmallScreen}
            openConsultation={openConsultation}
            overlayDetailsReady={overlayDetailsReady}
          />
        </Suspense>
      ) : null}
    </div>
  );
}
