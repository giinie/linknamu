// 저장된 선택(localStorage "theme")이 있으면 그 값을, 없으면 OS 설정을 <html data-theme>에 반영
export function applyTheme() {
  try {
    const saved = localStorage.getItem("theme");
    const theme =
      saved === "light" || saved === "dark"
        ? saved
        : matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.dataset.theme = theme;
  } catch {} // localStorage 접근 불가 시 라이트 유지
}

// <head> 인라인 스크립트용 — 첫 페인트 전에 실행해 테마 깜빡임 방지
export const themeScript = `(${applyTheme.toString()})()`;
