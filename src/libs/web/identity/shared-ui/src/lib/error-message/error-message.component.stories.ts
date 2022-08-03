import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ErrorMessageComponent } from './error-message.component';

export default {
  title: 'ErrorMessageComponent',
  component: ErrorMessageComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<ErrorMessageComponent>;

const Template: Story<ErrorMessageComponent> = (args: ErrorMessageComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  message: "Wystąpił nieoczekiwany błąd"
}