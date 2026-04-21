import { useState } from "react";
import { Outlet } from "react-router";
import { ConsultationDialog } from "../ConsultationDialog";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export type RootOutletContext = {
  openConsultation: () => void;
};

export function Root() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-cyan-500/30 font-sans flex flex-col">
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />
      <main className="flex-1 relative z-10">
        <Outlet context={{ openConsultation: () => setIsConsultationOpen(true) }} />
      </main>
      <Footer />
      <ConsultationDialog open={isConsultationOpen} onOpenChange={setIsConsultationOpen} />
    </div>
  );
}
