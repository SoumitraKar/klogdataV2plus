import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "motion/react";
import { X } from "lucide-react";

import { Dialog, DialogClose, DialogDescription, DialogPortal, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

type ConsultationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ConsultationDialog({ open, onOpenChange }: ConsultationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-1.5rem)] max-w-[980px] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-slate-700/70 bg-[#0b1528]/98 p-5 shadow-[0_40px_120px_rgba(2,6,23,0.72)] outline-none sm:w-[calc(100%-2.5rem)] sm:p-7 md:p-8">
          <DialogClose className="absolute right-4 top-4 h-11 w-11 rounded-full border border-slate-700 bg-slate-800/70 text-slate-200 transition-colors hover:bg-slate-700/80 hover:text-white cursor-pointer flex items-center justify-center">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <div className="max-h-[min(86vh,840px)] overflow-y-auto pr-1 sm:pr-2">
            <div className="max-w-[860px]">
              <DialogTitle className="max-w-[700px] text-[2.65rem] leading-[0.94] font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                Tell Klog Data what you need.
              </DialogTitle>
              <DialogDescription className="mt-4 text-lg leading-8 text-slate-400 sm:text-[1.08rem]">
                Share a brief outline of your requirement and we will get back to you with the right next step.
              </DialogDescription>

              <form className="mt-9 space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-3">
                    <label htmlFor="consultation-name" className="block text-sm font-bold uppercase tracking-[0.1em] text-slate-200">
                      Name
                    </label>
                    <Input
                      id="consultation-name"
                      type="text"
                      placeholder="Your name"
                      className="h-14 rounded-[1.35rem] border-slate-700 bg-slate-800/75 px-5 py-0 text-[1rem] text-slate-100 placeholder:text-slate-400 focus-visible:border-slate-500 focus-visible:ring-0"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="consultation-service" className="block text-sm font-bold uppercase tracking-[0.1em] text-slate-200">
                      Service Needed
                    </label>
                    <Select>
                      <SelectTrigger
                        id="consultation-service"
                        className="h-14 rounded-[1.35rem] border-slate-700 bg-slate-800/75 px-5 text-[1rem] text-slate-100 data-[size=default]:h-14 data-[placeholder]:text-slate-300 focus-visible:border-slate-500 focus-visible:ring-0 [&_svg]:text-slate-300"
                      >
                        <SelectValue placeholder="Select one" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-slate-700 bg-[#111c32] text-slate-100">
                        <SelectItem value="eduklog">Eduklog</SelectItem>
                        <SelectItem value="caklog">Caklog</SelectItem>
                        <SelectItem value="system-integration">System Integration</SelectItem>
                        <SelectItem value="data-analytics">Data Analytics</SelectItem>
                        <SelectItem value="custom-architecture">Custom Architecture</SelectItem>
                        <SelectItem value="cloud-migration">Cloud Migration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="consultation-email" className="block text-sm font-bold uppercase tracking-[0.1em] text-slate-200">
                      Email
                    </label>
                    <Input
                      id="consultation-email"
                      type="email"
                      placeholder="you@company.com"
                      className="h-14 rounded-[1.35rem] border-slate-700 bg-slate-800/75 px-5 py-0 text-[1rem] text-slate-100 placeholder:text-slate-400 focus-visible:border-slate-500 focus-visible:ring-0"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="consultation-phone" className="block text-sm font-bold uppercase tracking-[0.1em] text-slate-200">
                      Phone or WhatsApp
                    </label>
                    <Input
                      id="consultation-phone"
                      type="tel"
                      placeholder="Phone or WhatsApp number"
                      className="h-14 rounded-[1.35rem] border-slate-700 bg-slate-800/75 px-5 py-0 text-[1rem] text-slate-100 placeholder:text-slate-400 focus-visible:border-slate-500 focus-visible:ring-0"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="consultation-brief" className="block text-sm font-bold uppercase tracking-[0.1em] text-slate-200">
                    Project Brief
                  </label>
                  <Textarea
                    id="consultation-brief"
                    placeholder="Briefly outline your requirement, business context, and the outcome you want to achieve."
                    className="min-h-[8.2rem] rounded-[1.5rem] border-slate-700 bg-slate-800/75 px-5 py-5 text-[1rem] leading-8 text-slate-100 placeholder:text-slate-400 focus-visible:border-slate-500 focus-visible:ring-0"
                  />
                </div>

                <motion.button
                  type="submit"
                  className="inline-flex min-w-[168px] items-center justify-center rounded-full border border-cyan-500/30 bg-[radial-gradient(circle_at_30%_30%,rgba(125,211,252,0.35),rgba(56,189,248,0.18)_32%,rgba(29,78,216,0.08)_64%,rgba(15,23,42,0.1)_100%)] px-6 py-3.5 text-[1.05rem] font-semibold text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_26px_rgba(14,116,144,0.22)] transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_14px_34px_rgba(14,116,144,0.28)] cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Enquiry
                </motion.button>
              </form>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}