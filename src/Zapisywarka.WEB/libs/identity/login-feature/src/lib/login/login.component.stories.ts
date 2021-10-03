import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { action } from '@storybook/addon-actions';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SharedMaterialModule } from '@zapisywarka.web/material';
import { IdentityLoginFeatureModule } from '../identity-login-feature.module';
import { LoginComponent } from './login.component';

export default {
  title: 'LoginComponent',
  component: LoginComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule, IdentityLoginFeatureModule],
    })
  ],
 // argTypes: { onSubmit: {action: 'submit'}}
} as Meta<LoginComponent>;

const Template: Story<LoginComponent> = (args: LoginComponent) => ({
  component: LoginComponent,
  template: `<app-login-form (login)="onSubmit($event)"></app-login-form>`,
  props: {...args,
  onSubmit: (e: any)=> {
    console.log(e+'test')
    action('submit')(e)
  }
  }
  
});


export const Primary = Template.bind({});
Primary.args = { }

export const InvalidCredentialsError = Template.bind({})
InvalidCredentialsError.args = {
  invalidCredentialsError: "Błęda nazwa użytkownika i hasło"
}