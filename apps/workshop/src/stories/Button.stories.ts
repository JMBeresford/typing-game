import type { Meta, StoryObj } from '@storybook/react';

import { Button } from 'ui';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {options: ['primary', 'secondary'],  control: {type: 'select'}, defaultValue: 'primary'},
    size: {options: ['small', 'medium', 'large'], control: {type: 'select'}, defaultValue: 'medium'},
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    type: "primary",
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    type: "secondary",
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};
