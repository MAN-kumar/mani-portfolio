"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    if (!formData.email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");

    // Simulate API submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <div className="p-6 sm:p-10 rounded-2xl bg-slate-900/60 border border-slate-800">
      <h2 className="text-xl font-bold text-slate-100 mb-2">Send a Message</h2>
      <p className="text-xs sm:text-sm text-slate-400 mb-6">
        Have a project in mind or interested in collaborating? Leave a message below.
      </p>

      {status === "success" ? (
        <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
          <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
          <h3 className="text-lg font-bold text-emerald-300">Message Sent Successfully</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Thank you for reaching out! I will get back to you shortly.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setStatus("idle")}
            className="mt-2"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {status === "error" && (
            <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-xs text-rose-300 font-medium">
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <Input
            label="Your Name *"
            placeholder="e.g. Alex Morgan"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={status === "submitting"}
          />

          <Input
            label="Email Address *"
            type="email"
            placeholder="alex@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={status === "submitting"}
          />

          <Textarea
            label="Message *"
            placeholder="Describe your project, question, or inquiry..."
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            disabled={status === "submitting"}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={status === "submitting"}
            rightIcon={<Send className="h-4 w-4" />}
            className="w-full sm:w-auto"
          >
            Send Message
          </Button>
        </form>
      )}
    </div>
  );
};
