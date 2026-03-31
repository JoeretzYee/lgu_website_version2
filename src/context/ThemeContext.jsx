import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("lgd-theme");
    return saved ? saved === "dark" : false;
  });

  const [reducedMotion, setReducedMotion] = useState(() => {
    const saved = localStorage.getItem("lgd-motion");
    if (saved !== null) return saved === "reduced";
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem("lgd-fontsize") || "normal";
  });

  useEffect(() => {
    localStorage.setItem("lgd-theme", isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("lgd-motion", reducedMotion ? "reduced" : "normal");
  }, [reducedMotion]);

  useEffect(() => {
    localStorage.setItem("lgd-fontsize", fontSize);
    const sizes = {
      small: "14px",
      normal: "16px",
      large: "18px",
      "x-large": "20px",
    };
    document.documentElement.style.fontSize = sizes[fontSize] || "16px";
  }, [fontSize]);

  const toggleTheme = useCallback(() => setIsDark((prev) => !prev), []);
  const toggleMotion = useCallback(() => setReducedMotion((prev) => !prev), []);
  const changeFontSize = useCallback((size) => setFontSize(size), []);

  const value = {
    isDark,
    toggleTheme,
    reducedMotion,
    toggleMotion,
    fontSize,
    changeFontSize,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default ThemeContext;
