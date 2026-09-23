import React from "react";
import { LinkButton } from "@/components/ui/LinkButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { Magnetic } from "@/components/motion/Magnetic";
import { Mail, ArrowRight, FileText } from "lucide-react";

export const ContactCTA: React.FC = () => {
  return (
    <div className="py-12 sm:py-20 border-t border-[var(--border)]">
      <FadeIn>
        <div className="relative rounded-2xl glass-elevated p-8 sm:p-12 lg:p-16 text-center overflow-hidden shadow-2xl">
          {/* Ambient accent halo */}
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-[var(--accent-soft)] blur-[100px] rounded-full pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="font-mono text-xs font-semibold text-[var(--accent-primary)] tracking-widest uppercase mb-3">
              06 // CONNECT & COLLABORATE
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight mb-4">
              Let&apos;s Build Something Remarkable.
            </h2>
            <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed mb-8">
              Open for full-stack engineering roles, technical advisory, and research collaborations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Magnetic strength={5}>
                <LinkButton
                  href="/contact"
                  variant="primary"
                  size="lg"
                  leftIcon={<Mail className="h-4 w-4" />}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Send a Message
                </LinkButton>
              </Magnetic>

              <Magnetic strength={5}>
                <LinkButton
                  href="/resume"
                  variant="secondary"
                  size="lg"
                  leftIcon={<FileText className="h-4 w-4" />}
                >
                  View Resume
                </LinkButton>
              </Magnetic>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};
