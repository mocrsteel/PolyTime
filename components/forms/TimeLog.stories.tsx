import { StoryObj} from '@storybook/nextjs-vite';

import TimeLog from './TimeLog';

const meta = {
  component: TimeLog,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseTimeLog: Story = {}