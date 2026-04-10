import { beforeEach, describe, expect, it } from "vitest";
import {
  DEFAULT_THEME_MODE,
  getStoredThemeMode,
  setStoredThemeMode,
} from "./themeMode";

describe("themeMode", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns light mode by default", () => {
    expect(getStoredThemeMode()).toBe(DEFAULT_THEME_MODE);
  });

  it("stores and reads the selected mode", () => {
    setStoredThemeMode("dark");

    expect(getStoredThemeMode()).toBe("dark");
  });

  it("falls back to light when storage contains invalid value", () => {
    window.localStorage.setItem("solodb-theme-mode", "invalid-theme");

    expect(getStoredThemeMode()).toBe(DEFAULT_THEME_MODE);
  });
});
