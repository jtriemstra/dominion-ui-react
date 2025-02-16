/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  staticDirs: ["..\\public"],
  // webpackFinal: async (config) => {
  //   config.resolve.fallback = {
  //     ...config.resolve.fallback,
  //     // list from https://gist.github.com/ef4/d2cf5672a93cf241fd47c020b9b3066a
  //     console: false, // Prevent Webpack from resolving 'console' as a module
  //     assert: false,
  //     buffer: false,
  //     constants: false,
  //     crypto: false,
  //     domain: false,
  //     events: false,
  //     http: false,
  //     https: false,
  //     os: false,
  //     path: false,
  //     punycode: false,
  //     process: false,
  //     querystring: false,
  //     stream: false,
  //     _stream_duplex: false,
  //     _stream_passthrough: false,
  //     _stream_readable: false,
  //     _stream_transform: false,
  //     _stream_writable: false,
  //     string_decoder: false,
  //     sys: false,
  //     timers: false,
  //     tty: false,
  //     url: false,
  //     util: false,
  //     vm: false,
  //     zlib: false
  //   };
  //  return config;
  // }
};
export default config;
