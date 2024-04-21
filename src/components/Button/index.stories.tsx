import { Button } from ".";
import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
} as Meta<typeof Button>;

export const Template: StoryFn<typeof Button> = function (args) {
  return <Button {...args} />;
};

Template.args = {
  children: "Button",
};
