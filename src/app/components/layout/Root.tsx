import { Suspense, lazy, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { Navbar } from "./Navbar";
import { useSectionActivity } from "../useSectionActivity";

const Footer = lazy(async () => {
  const module = await import("./Footer");
  return { default: module.Footer };
});

const ConsultationDialog = lazy(async () => {
  const module = await import("../ConsultationDialog");
  return { default: module.ConsultationDialog };
});

export type RootOutletContext = {
  openConsultation: () => void;
};

export function Root() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isFooterReady, setIsFooterReady] = useState(false);
  const footerTrigger = useSectionActivity<HTMLDivElement>();

  useEffect(() => {
    if (footerTrigger.hasEntered) {
      setIsFooterReady(true);
    }
  }, [footerTrigger.hasEntered]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-cyan-500/30 font-sans flex flex-col">
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />
      <main className="flex-1 relative z-10">
        <Outlet context={{ openConsultation: () => setIsConsultationOpen(true) }} />
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
    </div>
  );
}
