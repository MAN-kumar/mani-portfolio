import React from "react";
import Link from "next/link";
import { PageContainer } from "./PageContainer";
import { navItems } from "@/config/navigation";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[var(--background-secondary)] border-t border-[var(--border)] text-[var(--text-secondary)] text-xs sm:text-sm">
      <PageContainer maxWidth="wide">
        <div className="py-10 sm:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
            <span className="font-mono text-xs font-bold text-[var(--text-primary)] tracking-wider">
              MANI {"//"} PORTFOLIO
            </span>
            <p className="text-[var(--text-muted)] text-xs font-mono">
              CONTENT IS DATA. UI IS A SYSTEM.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs font-mono">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="text-[var(--text-muted)] text-xs font-mono text-center md:text-right">
            © {currentYear} Mani Kumar. All rights reserved.
          </div>
        </div>
      </PageContainer>
    </footer>
  );
};
