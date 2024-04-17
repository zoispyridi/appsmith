module.exports = {
  stories: ["../../design-system/**/*.stories.@(mdx|ts|tsx)"],

  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-viewport",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "@storybook/addon-toolbars",
    "@storybook/addon-measure",
    "@storybook/addon-outline",
    "@storybook/preset-create-react-app",
    "./addons/theming/manager.ts",
    "@chromatic-com/storybook",
  ],

  framework: {
    name: "@storybook/react-vite",
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      propFilter: (prop) =>
        prop.parent ? !/node_modules\*/.test(prop.parent.fileName) : true,
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },

  core: {
    disableTelemetry: true,
  },

  docs: {
    autodocs: true,
  },
};
