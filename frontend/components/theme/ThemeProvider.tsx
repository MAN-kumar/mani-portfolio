"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";

export type Theme =
  | "indigo"
  | "electric-blue"
  | "cyan"
  | "emerald"
  | "violet"
  | "amber";

export interface ThemeConfig {
  id: Theme;
  name: string;
  primary: string;
  secondary: string;
  soft: string;
  glow: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: "indigo",
    name: "Indigo",
    primary: "#6366f1",
    secondary: "#818cf8",
    soft: "rgba(99, 102, 241, 0.15)",
    glow: "rgba(99, 102, 241, 0.35)",
  },
  {
    id: "electric-blue",
    name: "Electric Blue",
    primary: "#3b82f6",
    secondary: "#60a5fa",
    soft: "rgba(59, 130, 246, 0.15)",
    glow: "rgba(59, 130, 246, 0.35)",
  },
  {
    id: "cyan",
    name: "Cyan",
    primary: "#06b6d4",
    secondary: "#22d3ee",
    soft: "rgba(6, 182, 212, 0.15)",
    glow: "rgba(6, 182, 212, 0.35)",
  },
  {
    id: "emerald",
    name: "Emerald",
    primary: "#10b981",
    secondary: "#34d399",
    soft: "rgba(16, 185, 129, 0.15)",
    glow: "rgba(16, 185, 129, 0.35)",
  },
  {
    id: "violet",
    name: "Violet",
    primary: "#8b5cf6",
    secondary: "#a78bfa",
    soft: "rgba(139, 92, 246, 0.15)",
    glow: "rgba(139, 92, 246, 0.35)",
  },
  {
    id: "amber",
    name: "Amber",
    primary: "#f59e0b",
    secondary: "#fbbf24",
    soft: "rgba(245, 158, 11, 0.15)",
    glow: "rgba(245, 158, 11, 0.35)",
  },
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: ThemeConfig[];
  activeThemeConfig: ThemeConfig;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function subscribeTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("portfolio-theme-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("portfolio-theme-change", callback);
  };
}

function getThemeSnapshot(defaultTheme: Theme): Theme {
  const saved = localStorage.getItem("portfolio-theme") as Theme | null;
  if (saved && THEMES.some((t) => t.id === saved)) {
    return saved;
  }
  return defaultTheme;
}

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  defaultTheme?: Theme;
}> = ({ children, defaultTheme = "indigo" }) => {
  const theme = useSyncExternalStore(
    subscribeTheme,
    () => getThemeSnapshot(defaultTheme),
    () => defaultTheme
  );

  const mounted = useSyncExternalStore(
    subscribeTheme,
    () => true,
    () => false
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem("portfolio-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    window.dispatchEvent(new Event("portfolio-theme-change"));
  };

  const activeThemeConfig =
    THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, themes: THEMES, activeThemeConfig, mounted }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
