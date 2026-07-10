import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Task from './Task';

const meta = {
  component: Task,
  title: 'Task',
  tags: ['autodocs'],
} satisfies Meta<typeof Task>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Draft: Story = {
  args: {
    title: 'Implement NavButton component',
    description: 'Build the responsive sidebar navigation button with active state.',
    status: 'draft',
  },
};

export const Submitted: Story = {
  args: {
    title: 'Bootstrap Storybook setup',
    description: 'Configure Storybook with NextJS-Vite framework and core addons.',
    status: 'submitted',
  },
};

export const Approved: Story = {
  args: {
    title: 'Configure CI workflow',
    description: 'Set up GitHub Actions for lint, type check, and Storybook tests.',
    status: 'approved',
  },
};

export const Rejected: Story = {
  args: {
    title: 'Add audit logging',
    status: 'rejected',
  },
};
