"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { PageContainer } from "./PageContainer";
import { navItems } from "@/config/navigation";

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#090a0f]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <PageContainer maxWidth="wide">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="group flex items-center gap-2 font-mono text-sm font-bold tracking-wider text-slate-100 hover:text-sky-400 transition-colors"
          >
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 group-hover:border-sky-500/40 transition-colors">
              <Terminal className="h-4 w-4" />
            </div>
            <span>MANI</span>
            <span className="text-sky-400 group-hover:translate-x-0.5 transition-transform">{"//"}</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? "text-sky-400 bg-sky-500/10 border border-sky-500/20 font-semibold"
                      : "text-slate-300 hover:text-slate-100 hover:bg-slate-900/60"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-300 hover:text-slate-100 hover:bg-slate-900 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-sky-400" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="md:hidden mt-4 pt-4 border-t border-slate-800 flex flex-col space-y-2 bg-[#090a0f]/95 rounded-xl p-4 border shadow-2xl"
            >
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "text-sky-400 bg-sky-500/10 border border-sky-500/20 font-semibold"
                        : "text-slate-300 hover:text-slate-100 hover:bg-slate-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </PageContainer>
    </header>
  );
};
