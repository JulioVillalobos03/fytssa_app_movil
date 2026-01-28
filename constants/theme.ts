import { Platform } from "react-native";

export type ThemeMode = "light" | "dark";

export const base = {
  radius: {
    md: 14,
    lg: 18,
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 24,
    xl: 32,
  },
  font: {
    title: 28,
    subtitle: 14,
    body: 16,
    small: 12,
  },
};

export const lightTheme = {
  mode: "light" as ThemeMode,
  background: "#F8FAFC",
  surface: "#FFFFFF",
  text: "#0F172A",
  textSecondary: "#475569",
  border: "#E2E8F0",
  shadow: "rgba(2, 6, 23, 0.08)",
  danger: "#EF4444",
  button: "#D4D9E1",
};

export const darkTheme = {
  mode: "dark" as ThemeMode,
  background: "#121212",
  surface: "#121212",
  text: "#F8FAFC",
  textSecondary: "#ffffff",
  border: "#172554",
  shadow: "rgba(0, 0, 0, 0.30)",
  danger: "#F87171",
  button: "#6D7281",
};


export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
