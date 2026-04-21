import { Suspense, lazy, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { Navbar } from "./Navbar";

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

  useEffect(() => {
    let timeoutId = 0;
    let idleId: number | null = null;

    const enableFooter = () => setIsFooterReady(true);
    const idleWindow = window as Window & typeof globalThis & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(enableFooter, { timeout: 1500 });
    } else {
      timeoutId = globalThis.setTimeout(enableFooter, 900);
    }

    return () => {
      if (idleId !== null && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId);
      }

      if (timeoutId) {
        globalThis.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-cyan-500/30 font-sans flex flex-col">
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />
      <main className="flex-1 relative z-10">
        <Outlet context={{ openConsultation: () => setIsConsultationOpen(true) }} />
      </main>
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
