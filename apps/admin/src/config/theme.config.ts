import type { ThemeConfig } from "antd";

export const theme: (overrides?: ThemeConfig) => ThemeConfig = (overrides) => {
  const { token, ...rest } = overrides || {};

  return {
    token: {
      colorPrimary: "#0C4394",
      fontFamily: "DM Sans, sans-serif",
      ...token,
    },
    ...rest,
  };
};

