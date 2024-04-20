import type { AddonOptionsWebpack } from "@storybook/addon-coverage";
import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

const coverageConfig: AddonOptionsWebpack = {
  istanbul: {
    include: ["**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  },
};

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "storybook-dark-mode",
    {
      name: "@storybook/addon-coverage",
      options: coverageConfig,
    },
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: "automatic",
        },
      },
    },
  }),
  webpackFinal(config, { configType }) {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    (config.module?.rules ?? []).push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });

    // Return the altered config
    return config;
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: [path.join(process.cwd(), "./public")],
};
export default config;
