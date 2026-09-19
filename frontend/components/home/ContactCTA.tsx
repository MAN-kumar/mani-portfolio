import React from "react";
import { LinkButton } from "@/components/ui/LinkButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { Magnetic } from "@/components/motion/Magnetic";
import { Mail, ArrowRight } from "lucide-react";

export const ContactCTA: React.FC = () => {
  return (
    <div className="py-16 sm:py-24">
      <FadeIn>
        <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 p-8 sm:p-12 lg:p-16 border border-slate-800 text-center overflow-hidden shadow-2xl">
          {/* Subtle accent backdrop blur */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="font-mono text-xs font-semibold text-sky-400 tracking-wider uppercase mb-3">
              06 // CONNECT & COLLABORATE
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-4">
              Let&apos;s Build Something Remarkable.
            </h2>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
              Open for full-stack engineering roles, technical advisory, and research collaborations.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
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
