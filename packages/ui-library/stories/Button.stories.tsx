import type { Meta, StoryObj } from "@storybook/react";
import Button from "../src/components/Button/Button";
import { BrowserRouter } from "react-router-dom";

const ButtonWithRouter = (args: any) => (
  <BrowserRouter>
    <Button {...args} />
  </BrowserRouter>
);

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: ButtonWithRouter,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outlined", "text"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    to: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "Outlined Button",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    children: "Text Button",
  },
};

// Variantes de tamaño
export const SmallButton: Story = {
  args: {
    variant: "primary",
    size: "small",
    children: "Small Button",
  },
};

export const LargeButton: Story = {
  args: {
    variant: "primary",
    size: "large",
    children: "Large Button",
  },
};

export const DisabledButton: Story = {
  args: {
    variant: "primary",
    disabled: true,
    children: "Disabled Button",
  },
};

export const LinkButton: Story = {
  args: {
    variant: "primary",
    to: "/some-path",
    children: "Link Button",
  },
};
