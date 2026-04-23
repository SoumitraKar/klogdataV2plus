import { Suspense, lazy, useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { useSectionActivity } from "../useSectionActivity";
import { Home } from "../../pages/Home";

const Footer = lazy(async () => {
  const module = await import("./Footer");
  return { default: module.Footer };
});

const ConsultationDialog = lazy(async () => {
  const module = await import("../ConsultationDialog");
  return { default: module.ConsultationDialog };
});

const Toaster = lazy(async () => {
  const module = await import("sonner");
  return { default: module.Toaster };
});

export function Root() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isFooterReady, setIsFooterReady] = useState(false);
  const [isToasterReady, setIsToasterReady] = useState(false);
  const footerTrigger = useSectionActivity<HTMLDivElement>();

  useEffect(() => {
    if (footerTrigger.hasEntered) {
      setIsFooterReady(true);
    }
  }, [footerTrigger.hasEntered]);

  useEffect(() => {
    if (isConsultationOpen) {
      setIsToasterReady(true);
    }
  }, [isConsultationOpen]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-cyan-500/30 font-sans flex flex-col">
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />
      <main className="flex-1 relative z-10">
        <Home openConsultation={() => setIsConsultationOpen(true)} />
      </main>
      <div ref={footerTrigger.ref} className="h-px w-full" aria-hidden="true" />
      {isFooterReady ? (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      ) : null}
      {isConsultationOpen ? (
        <Suspense fallback={null}>
          <ConsultationDialog open={isConsultationOpen} onOpenChange={setIsConsultationOpen} />
        </Suspense>
      ) : null}
      {isToasterReady ? (
        <Suspense fallback={null}>
          <Toaster
            position="bottom-right"
            richColors
            duration={5000}
            toastOptions={{
              classNames: {
                toast: "border border-slate-700 bg-slate-900 text-slate-100 shadow-2xl",
                title: "text-sm font-medium leading-6",
              },
            }}
          />
        </Suspense>
      ) : null}
    </div>
  );
}
