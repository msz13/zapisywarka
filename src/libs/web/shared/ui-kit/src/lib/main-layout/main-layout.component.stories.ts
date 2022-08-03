import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { MainLayoutComponent } from './main-layout.component';

export default {
  title: 'MainLayoutComponent',
  component: MainLayoutComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<MainLayoutComponent>;

const Template: Story<MainLayoutComponent> = (args: MainLayoutComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
    accauntName:  '',
}