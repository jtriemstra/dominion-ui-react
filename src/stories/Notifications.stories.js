import Notifications from '../components/Notifications.js';


export default {
  title: 'Dominion/Notifications',
  component: Notifications,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
  }
};

export const Basic = {
    args: {
        fetchMethod: (setNotifications) => {
            setNotifications(["Test 1","Test 2"]);
        }
    }
}