
import { Story } from '@storybook/angular';
import { LoginContainerComponent } from './login-container.component';
import {CommonModule} from '@angular/common'
import {action} from '@storybook/addon-actions'

export default {
  title: 'LoginContainerComponent',
  component: LoginContainerComponent,
  argTypes: {
    clicked: {action: 'clickarg'},
    test: {control: {type: 'text'}, defaultValue: 'proba1'}
  }
}


const Template: Story<LoginContainerComponent> = (args) => ({
  template: `<app-login-containter (clicked)="clicked($event)"></app-login-containter>`,
  props: args,
  moduleMetadata: {
    imports: [CommonModule]
  },
})

export const primary = Template.bind({})


