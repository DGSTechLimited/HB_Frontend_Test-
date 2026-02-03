import type { ThemeConfig } from "antd";

export const theme: (overrides?: ThemeConfig) => ThemeConfig = (overrides) => {
  const { token, components, ...rest } = overrides || {};

  return {
    token: {
      colorPrimary: "#00E5FF",
      fontFamily: "DM Sans, sans-serif",
      ...token,
    },
    components: {
      Button: {
        defaultBorderColor: "#00E5FF",
        defaultColor: "#00E5FF",
        borderRadius: 9999,
        borderRadiusLG: 9999,
        ...components?.Button,
      },
      ...components,
    },
    ...rest,
  };
};
