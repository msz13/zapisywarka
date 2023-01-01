import { ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SharedMaterialModule } from '@zapisywarka-web/web-shared-material';
import { PasswordFieldComponent } from './password-field.component';

export default {
  title: 'PasswordFieldComponent',
  component: PasswordFieldComponent,
  decorators: [
    moduleMetadata({
      imports: [SharedMaterialModule, ReactiveFormsModule],
    })
  ],
} as Meta<PasswordFieldComponent>;

const Template: Story<PasswordFieldComponent> = (args: PasswordFieldComponent) => ({
  props: args,
});



export const Primary = Template.bind({});
Primary.args = {
  label: '',
};

export const Label = Template.bind({});
Label.args = {
  label: 'Nazwa',
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  label: '',
  placeholder: "Placeholder"
};

export const Hint = Template.bind({});
Hint.args = { 
  label: 'Label',
  hint: 'Hint text'
};

export const Required = Template.bind({});
Required.args = { 
  label: 'Label',
  required: true
};

export const Error = Template.bind({});
Error.args = { 
  label: 'Label',
  showError: true,
  errorMessage: "Field is required"
};
