"use client";

import { useLayoutEffect } from "react";
import { applyTheme } from "@/lib/theme";

export default function ThemeToggle() {
  // dev Strict Mode 재마운트 때 React가 <html> 속성을 지우므로 다시 적용 (프로덕션에선 무해)
  useLayoutEffect(applyTheme, []);

  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="다크 모드 전환"
      className="fixed top-5 right-5 flex size-11 items-center justify-center rounded-full border border-white/60 bg-white/45 text-lg shadow-[0_4px_20px_-6px_rgba(120,70,40,0.15)] backdrop-blur-md transition duration-200 hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
    >
      <span className="dark:hidden">🌙</span>
      <span className="hidden dark:inline">☀️</span>
    </button>
  );
}
