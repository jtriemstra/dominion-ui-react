/** @type { import('@storybook/react').Preview } */

import "../src/App.css";
import jest from 'jest-mock';

window.jest = jest;

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
