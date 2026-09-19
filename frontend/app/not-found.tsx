import React from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { LinkButton } from "@/components/ui/LinkButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { Terminal, Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <PageContainer maxWidth="narrow" className="py-32 sm:py-40 text-center flex flex-col items-center justify-center min-h-[70vh]">
      <FadeIn>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-sky-400 mb-6 inline-flex">
          <Terminal className="h-10 w-10" />
        </div>

        <span className="font-mono text-xs font-bold text-sky-400 tracking-wider uppercase block mb-2">
          ERROR 404 // ROUTE NOT FOUND
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight mb-4">
          Page Does Not Exist
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
          The requested page or resource could not be found. Please check the URL path or navigate back to the main platform.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <LinkButton href="/" variant="primary" size="md" leftIcon={<Home className="h-4 w-4" />}>
            Return Home
          </LinkButton>
          <LinkButton href="/projects" variant="secondary" size="md" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Browse Projects
          </LinkButton>
        </div>
      </FadeIn>
    </PageContainer>
  );
}
