export type ThemeMode = "light" | "dark";

export const DEFAULT_THEME_MODE: ThemeMode = "light";

const THEME_MODE_STORAGE_KEY = "solodb-theme-mode";

function isThemeMode(value: string | null): value is ThemeMode {
  return value === "light" || value === "dark";
}

export function getStoredThemeMode(): ThemeMode {
  if (typeof window === "undefined") {
    return DEFAULT_THEME_MODE;
  }

  const storedTheme = window.localStorage.getItem(THEME_MODE_STORAGE_KEY);

  return isThemeMode(storedTheme) ? storedTheme : DEFAULT_THEME_MODE;
}

export function setStoredThemeMode(themeMode: ThemeMode): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(THEME_MODE_STORAGE_KEY, themeMode);
}
