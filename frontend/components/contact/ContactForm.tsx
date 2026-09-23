"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Send, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});

  const validate = () => {
    const newErrors: { name?: boolean; email?: boolean; message?: boolean } = {};
    let valid = true;

    if (!formData.name.trim()) {
      newErrors.name = true;
      valid = false;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      newErrors.email = true;
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = true;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields with a valid email address.");
      return;
    }

    setStatus("submitting");

    // Client-side simulation of backend communication channel transmission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    }, 1200);
  };

  return (
    <Card className="p-6 sm:p-10 rounded-2xl glass-elevated border border-[var(--border)] shadow-xl space-y-6">
      <div>
        <span className="font-mono text-xs font-bold text-[var(--accent-primary)] uppercase tracking-wider block mb-1">
          {"// DIRECT ENDPOINT"}
        </span>
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Send a Message</h2>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
          Have a technical inquiry, project proposal, or research collaboration in mind? Fill out the payload below.
        </p>
      </div>

      {status === "success" ? (
        <div className="p-6 rounded-xl bg-[var(--accent-soft)] border border-[var(--accent-glow)] text-center space-y-4">
          <CheckCircle2 className="h-10 w-10 text-[var(--accent-primary)] mx-auto" />
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Message Transmitted Successfully</h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Thank you for reaching out! Your communication payload has been dispatched.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setStatus("idle")}
            className="mt-2"
          >
            Send Another Payload
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {status === "error" && (
            <div
              role="alert"
              className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-xs text-rose-300 font-medium"
            >
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <Input
              label="Your Name *"
              placeholder="e.g. Alex Morgan"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: false });
              }}
              disabled={status === "submitting"}
              aria-invalid={errors.name}
            />
            {errors.name && (
              <span className="text-[11px] font-mono text-rose-400 mt-1 block">Name is required</span>
            )}
          </div>

          <div>
            <Input
              label="Email Address *"
              type="email"
              placeholder="alex@example.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: false });
              }}
              disabled={status === "submitting"}
              aria-invalid={errors.email}
            />
            {errors.email && (
              <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                Valid email address is required
              </span>
            )}
          </div>

          <div>
            <Textarea
              label="Message Payload *"
              placeholder="Describe your project, inquiry, or technical question..."
              rows={5}
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: false });
              }}
              disabled={status === "submitting"}
              aria-invalid={errors.message}
            />
            {errors.message && (
              <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                Message content is required
              </span>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={status === "submitting"}
            rightIcon={
              status === "submitting" ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )
            }
            className="w-full sm:w-auto"
          >
            {status === "submitting" ? "Transmitting..." : "Transmit Message"}
          </Button>
        </form>
      )}
    </Card>
  );
};
