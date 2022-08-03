import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SharedUiKitModule } from '../shared-ui-kit.module';
import { TextFieldComponent } from './text-field.component';

export default {
  title: 'TextFieldComponent',
  component: TextFieldComponent,
  decorators: [
    moduleMetadata({
      imports: [SharedUiKitModule],   
    })
  ],
} as Meta<TextFieldComponent>;

const Template: Story<TextFieldComponent> = (args: TextFieldComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  label: "Nazwa"
}

