"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-800 bg-transparent flex items-center justify-center opacity-60 ${className}`}
        aria-hidden="true"
      >
        <span className="w-4 h-4" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-all duration-200 hover:border-neutral-400 dark:hover:border-neutral-600 focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100" />
      )}
    </button>
  );
}
