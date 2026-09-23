"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme, THEMES, Theme } from "./ThemeProvider";
import { Palette, Check } from "lucide-react";

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { theme, setTheme, activeThemeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] transition-all focus-visible:outline-2 focus-visible:outline-[var(--accent-primary)] select-none"
        aria-label="Switch Theme"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span
          className="h-2.5 w-2.5 rounded-full shadow-sm"
          style={{ backgroundColor: activeThemeConfig.primary }}
        />
        <span className="hidden sm:inline">{activeThemeConfig.name}</span>
        <Palette className="h-3.5 w-3.5 text-[var(--accent-primary)] ml-0.5" />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-label="Theme options"
          className="absolute right-0 mt-2 w-44 py-1.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-hover)] shadow-2xl z-50 backdrop-blur-xl"
        >
          <div className="px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border)] mb-1">
            Accent Spectrum
          </div>
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              role="menuitem"
              onClick={() => {
                setTheme(t.id as Theme);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-mono transition-colors ${
                theme === t.id
                  ? "bg-[var(--accent-soft)] text-[var(--accent-primary)] font-semibold"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: t.primary }}
                />
                <span>{t.name}</span>
              </div>
              {theme === t.id && <Check className="h-3.5 w-3.5 text-[var(--accent-primary)]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
