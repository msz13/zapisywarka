import { text } from '@storybook/addon-knobs';
import { InitialAvatarComponent } from './initial-avatar.component';

export default {
  title: 'InitialAvatarComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [],
  },
  component: InitialAvatarComponent,
  props: {
    content: text('content', 'Mateusz'),
  },
});
