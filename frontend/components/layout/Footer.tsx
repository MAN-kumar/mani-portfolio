import React from "react";
import Link from "next/link";
import { PageContainer } from "./PageContainer";
import { Divider } from "@/components/ui/Divider";
import { navItems } from "@/config/navigation";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#090a0f] text-slate-400 text-xs sm:text-sm">
      <PageContainer maxWidth="wide">
        <Divider variant="subtle" className="my-0" />
        <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
            <span className="font-mono text-xs font-bold text-slate-200 tracking-wider">
              MANI {"//"} PORTFOLIO
            </span>
            <p className="text-slate-500 text-xs">
              CONTENT IS DATA. UI IS A SYSTEM.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-400 hover:text-sky-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="text-slate-500 text-xs text-center md:text-right">
            © {currentYear} Mani. All rights reserved.
          </div>
        </div>
      </PageContainer>
    </footer>
  );
};
