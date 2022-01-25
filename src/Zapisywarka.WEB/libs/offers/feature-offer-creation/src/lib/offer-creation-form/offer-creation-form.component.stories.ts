import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SharedMaterialModule } from '@zapisywarka.web/material';
import { OfferCreationFormComponent } from './offer-creation-form.component';

export default {
  title: 'OfferCreationFormComponent',
  component: OfferCreationFormComponent,
  decorators: [
    moduleMetadata({
      imports: [SharedMaterialModule],
    })
  ],
} as Meta<OfferCreationFormComponent>;

const Template: Story<OfferCreationFormComponent> = (args: OfferCreationFormComponent) => ({
  component: OfferCreationFormComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}