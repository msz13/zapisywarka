import { FormBuilder } from '@angular/forms';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { offerDetatilsListFixture } from '../utills/offer-details-list';
import { RegistrationFormComponent } from './registration-form.component';
import { RegistrationFormService } from './registration-form.service';


export default {
  title: 'RegistrationFormComponent',
  component: RegistrationFormComponent,
  parameters: {actions: { argTypesRegex: 'reservation' }},
  decorators: [
    moduleMetadata({
      imports: [],
      providers: [RegistrationFormService, FormBuilder]
    }),
  ],
} as Meta<RegistrationFormComponent>;

const Template: Story<RegistrationFormComponent> = (
  args: RegistrationFormComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  offer: offerDetatilsListFixture[0]  
};

export const Submitting = Template.bind({});
Submitting.args = {
  offer: offerDetatilsListFixture[0],
  submitting: true  
};