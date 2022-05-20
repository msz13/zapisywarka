import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SignUpContainerComponent } from './sign-up-container.component';

export default {
  title: 'SignUpContainerComponent',
  component: SignUpContainerComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<SignUpContainerComponent>;

const Template: Story<SignUpContainerComponent> = (args: SignUpContainerComponent) => ({
  component: SignUpContainerComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}