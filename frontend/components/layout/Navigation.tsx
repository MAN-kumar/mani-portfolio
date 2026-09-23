"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { PageContainer } from "./PageContainer";
import { navItems } from "@/config/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--surface-elevated)]/90 backdrop-blur-xl border-b border-[var(--border)] shadow-xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <PageContainer maxWidth="wide">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="group flex items-center gap-2 font-mono text-sm font-bold tracking-wider text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
          >
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--accent-primary)] group-hover:border-[var(--accent-primary)] transition-all shadow-sm">
              <Terminal className="h-4 w-4" />
            </div>
            <span>MANI</span>
            <span className="text-[var(--accent-primary)] group-hover:translate-x-0.5 transition-transform">{"//"}</span>
          </Link>

          {/* Desktop Navigation Links & Theme Switcher */}
          <div className="hidden md:flex items-center space-x-3">
            <nav className="flex items-center space-x-1 lg:space-x-1.5 p-1 rounded-xl bg-[var(--surface)]/60 border border-[var(--border)] backdrop-blur-md">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-[var(--accent-primary)] bg-[var(--accent-soft)] border border-[var(--accent-glow)] font-semibold shadow-sm"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-transparent"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Integrated Spectrum Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Actions Header */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-[var(--accent-primary)]" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="md:hidden mt-4 pt-4 border-t border-[var(--border)] flex flex-col space-y-2 bg-[var(--surface-elevated)]/95 backdrop-blur-2xl rounded-2xl p-4 border border-[var(--border-hover)] shadow-2xl"
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
                        ? "text-[var(--accent-primary)] bg-[var(--accent-soft)] border border-[var(--accent-glow)] font-semibold"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
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
