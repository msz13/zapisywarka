import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { IdentitySharedUiModule } from '../identity-shared-ui.module';
import { IdentityCardComponent } from './identity-card.component';

export default {
  title: 'IdentityCardComponent',
  component: IdentityCardComponent,
  decorators: [
    moduleMetadata({
      imports: [IdentitySharedUiModule],
    })
  ],
} as Meta<IdentityCardComponent>;

const Template: Story<IdentityCardComponent> = (args: IdentityCardComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}

export const Loading = Template.bind({});
Primary.args = {
  loadind: true
}