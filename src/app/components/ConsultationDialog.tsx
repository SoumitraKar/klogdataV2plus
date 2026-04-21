import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { toast } from "sonner";

import { Dialog, DialogClose, DialogDescription, DialogPortal, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

type ConsultationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_ALLOWED_PATTERN = /^[+\d\s()-]+$/;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "62c27673-a0b5-47ec-aed1-ad3526e52c0c";

function getEmailError(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "";
  }

  return EMAIL_PATTERN.test(trimmedValue) ? "" : "Please enter a valid email address.";
}

function getPhoneError(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "";
  }

  if (!PHONE_ALLOWED_PATTERN.test(trimmedValue)) {
    return "Please enter a valid phone number.";
  }

  const digitsOnly = trimmedValue.replace(/\D/g, "");

  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    return "Please enter a valid phone number.";
  }

  return "";
}

export function ConsultationDialog({ open, onOpenChange }: ConsultationDialogProps) {
  const [name, setName] = useState("");
  const [serviceNeeded, setServiceNeeded] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [brief, setBrief] = useState("");
  const [nameError, setNameError] = useState("");
  const [serviceError, setServiceError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [contactError, setContactError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setName("");
    setServiceNeeded("");
    setEmail("");
    setPhone("");
    setBrief("");
    setNameError("");
    setServiceError("");
    setEmailError("");
    setPhoneError("");
    setContactError("");
    setSubmitError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setSubmitError("");

    let hasError = false;

    if (!name.trim()) {
      setNameError("Please add your name.");
      hasError = true;
    } else {
      setNameError("");
    }

    if (!serviceNeeded.trim()) {
      setServiceError("Please select a service.");
      hasError = true;
    } else {
      setServiceError("");
    }

    const nextEmailError = getEmailError(email);
    const nextPhoneError = getPhoneError(phone);

    setEmailError(nextEmailError);
    setPhoneError(nextPhoneError);

    if (nextEmailError || nextPhoneError) {
      hasError = true;
    }

    if (!email.trim() && !phone.trim()) {
      setContactError("Please add an email address or phone number.");
      hasError = true;
    } else {
      setContactError("");
    }

    if (hasError) {
      return;
    }

    const message = brief.trim() || `Service needed: ${serviceNeeded}`;

    setIsSubmitting(true);

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New consultation enquiry: ${serviceNeeded}`,
          from_name: name.trim(),
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          service_needed: serviceNeeded,
          message,
        }),
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send your enquiry right now.");
      }

      resetForm();
      onOpenChange(false);
      toast.success("Thank you for your enquiry. Our team will review your requirements and get back to you shortly.", {
        duration: 5000,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send your enquiry right now.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextName = event.target.value;
    setName(nextName);
    setSubmitError("");

    if (nextName.trim()) {
      setNameError("");
    }
  };

  const handleServiceChange = (value: string) => {
    setServiceNeeded(value);
    setSubmitError("");

    if (value.trim()) {
      setServiceError("");
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextEmail = event.target.value;
    setEmail(nextEmail);
    setSubmitError("");

    const nextEmailError = getEmailError(nextEmail);
    setEmailError(nextEmailError);

    if (nextEmail.trim() || phone.trim()) {
      setContactError("");
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextPhone = event.target.value;
    setPhone(nextPhone);
    setSubmitError("");

    const nextPhoneError = getPhoneError(nextPhone);
    setPhoneError(nextPhoneError);

    if (email.trim() || nextPhone.trim()) {
      setContactError("");
    }
  };

  const handleBriefChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBrief(event.target.value);
    setSubmitError("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_38%),rgba(2,6,23,0.82)] backdrop-blur-sm" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 max-h-[88vh] w-[calc(100%-1rem)] max-w-[760px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.75rem] border border-cyan-500/10 bg-[linear-gradient(180deg,rgba(8,15,29,0.98),rgba(7,13,24,0.98))] shadow-[0_32px_120px_rgba(2,6,23,0.78)] outline-none sm:w-[calc(100%-2rem)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.07)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-20" />
          <div className="pointer-events-none absolute -left-24 top-12 h-56 w-56 rounded-full bg-cyan-500/12 blur-[110px]" />
          <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-indigo-500/12 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-fuchsia-500/8 blur-[90px]" />

          <DialogClose className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-slate-300 transition-colors hover:border-cyan-400/40 hover:bg-slate-800 hover:text-white cursor-pointer">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <div
            className="relative max-h-[88vh] overflow-y-auto overscroll-contain"
            style={{ scrollbarGutter: "stable" }}
          >
            <div className="relative">
              <div className="rounded-[1.45rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(7,13,24,0.94))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-5">
                <div className="mb-4 max-w-[560px] pr-10">
                  <DialogTitle className="text-[1.65rem] font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-[2rem] md:text-[2.2rem]">
                    Tell Klog Data what you need.
                  </DialogTitle>
                  <DialogDescription className="mt-2 text-sm leading-6 text-slate-400 sm:text-[0.95rem]">
                    Share your requirement and one reliable way to reach you. We will follow up with the right next step.
                  </DialogDescription>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2.5">
                      <label htmlFor="consultation-name" className="block text-[0.7rem] font-bold uppercase tracking-[0.18em] text-slate-300">
                        Name
                      </label>
                      <Input
                        id="consultation-name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Your name"
                        disabled={isSubmitting}
                        aria-invalid={nameError ? "true" : undefined}
                        className="h-11 rounded-[1rem] border-white/10 bg-white/[0.04] px-4 py-0 text-[0.95rem] text-slate-100 placeholder:text-slate-500 focus-visible:border-cyan-400/45 focus-visible:bg-white/[0.06] focus-visible:ring-0"
                      />
                      {nameError ? <p className="text-sm font-medium text-red-400">{nameError}</p> : null}
                    </div>

                    <div className="space-y-2.5">
                      <label htmlFor="consultation-service" className="block text-[0.7rem] font-bold uppercase tracking-[0.18em] text-slate-300">
                        Service Needed
                      </label>
                      <Select value={serviceNeeded} onValueChange={handleServiceChange}>
                        <SelectTrigger
                          id="consultation-service"
                          disabled={isSubmitting}
                          aria-invalid={serviceError ? "true" : undefined}
                          className="h-11 rounded-[1rem] border-white/10 bg-white/[0.04] px-4 text-[0.95rem] text-slate-100 data-[size=default]:h-11 data-[placeholder]:text-slate-500 focus-visible:border-cyan-400/45 focus-visible:bg-white/[0.06] focus-visible:ring-0 [&_svg]:text-slate-400"
                        >
                          <SelectValue placeholder="Select one" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-white/10 bg-[#111c32] text-slate-100">
                          <SelectItem value="eduklog">Eduklog</SelectItem>
                          <SelectItem value="caklog">Caklog</SelectItem>
                          <SelectItem value="system-integration">System Integration</SelectItem>
                          <SelectItem value="data-analytics">Data Analytics</SelectItem>
                          <SelectItem value="custom-architecture">Custom Architecture</SelectItem>
                          <SelectItem value="cloud-migration">Cloud Migration</SelectItem>
                        </SelectContent>
                      </Select>
                      {serviceError ? <p className="text-sm font-medium text-red-400">{serviceError}</p> : null}
                    </div>

                    <div className="space-y-2.5">
                      <label htmlFor="consultation-email" className="block text-[0.7rem] font-bold uppercase tracking-[0.18em] text-slate-300">
                        Email
                      </label>
                      <Input
                        id="consultation-email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        autoComplete="email"
                        placeholder="you@company.com"
                        disabled={isSubmitting}
                        aria-invalid={emailError || contactError ? "true" : undefined}
                        aria-describedby={emailError ? "consultation-email-error" : undefined}
                        className="h-11 rounded-[1rem] border-white/10 bg-white/[0.04] px-4 py-0 text-[0.95rem] text-slate-100 placeholder:text-slate-500 focus-visible:border-cyan-400/45 focus-visible:bg-white/[0.06] focus-visible:ring-0"
                      />
                      {emailError ? <p id="consultation-email-error" className="text-sm font-medium text-red-400">{emailError}</p> : null}
                    </div>

                    <div className="space-y-2.5">
                      <label htmlFor="consultation-phone" className="block text-[0.7rem] font-bold uppercase tracking-[0.18em] text-slate-300">
                        Phone or WhatsApp
                      </label>
                      <Input
                        id="consultation-phone"
                        type="tel"
                        name="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="Phone or WhatsApp number"
                        disabled={isSubmitting}
                        aria-invalid={phoneError || contactError ? "true" : undefined}
                        aria-describedby={phoneError ? "consultation-phone-error" : undefined}
                        className="h-11 rounded-[1rem] border-white/10 bg-white/[0.04] px-4 py-0 text-[0.95rem] text-slate-100 placeholder:text-slate-500 focus-visible:border-cyan-400/45 focus-visible:bg-white/[0.06] focus-visible:ring-0"
                      />
                      {phoneError ? <p id="consultation-phone-error" className="text-sm font-medium text-red-400">{phoneError}</p> : null}
                    </div>
                  </div>

                  {contactError ? (
                    <p className="-mt-1 text-sm font-medium text-red-400">{contactError}</p>
                  ) : null}

                  <div className="space-y-2">
                    <label htmlFor="consultation-brief" className="block text-[0.7rem] font-bold uppercase tracking-[0.18em] text-slate-300">
                      Project Brief
                    </label>
                    <Textarea
                      id="consultation-brief"
                      name="message"
                      value={brief}
                      onChange={handleBriefChange}
                      disabled={isSubmitting}
                      placeholder="Briefly outline your requirement, business context, and the outcome you want to achieve."
                      className="min-h-[5.1rem] rounded-[1.05rem] border-white/10 bg-white/[0.04] px-4 py-2.5 text-[0.95rem] leading-6 text-slate-100 placeholder:text-slate-500 focus-visible:border-cyan-400/45 focus-visible:bg-white/[0.06] focus-visible:ring-0"
                    />
                  </div>

                  {submitError ? <p className="text-sm font-medium text-red-400">{submitError}</p> : null}

                  <div className="flex justify-end pt-1">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex min-w-[154px] items-center justify-center rounded-full border border-cyan-400/30 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(99,102,241,0.2)_55%,rgba(244,63,94,0.14))] px-4 py-2.5 text-[0.9rem] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(8,47,73,0.3)] transition-all duration-300 hover:border-cyan-300/50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_14px_30px_rgba(8,47,73,0.38)] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.985 }}
                    >
                      {isSubmitting ? "Sending..." : "Send Enquiry"}
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}