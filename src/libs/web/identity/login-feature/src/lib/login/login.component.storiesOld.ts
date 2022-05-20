import { LoginComponent } from './login.component';
import { WebSharedMaterialModule } from '@zapisywarka-web/web-shared-material';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebSharedDomainModule } from '@zapisywarka-web/web-shared-domain';
import { Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
  IFormGroup,
  RxwebValidators,
  RxFormBuilder,
} from '@rxweb/reactive-form-validators';
import { Component, Output, EventEmitter } from '@angular/core';
import { WebIdentityLoginFeatureModule } from '../web-identity-login-feature.module';

export default {
  title: 'LoginComponent',
  argTypes: { onSubmit: { action: 'submit' } },
};

const buildRxForm = () => {
  const builder = new RxFormBuilder();
  return builder.group({
    userName: new FormControl('', [
      RxwebValidators.required({ message: 'Pole jest wymagane' }),
    ]),
    password: new FormControl('', [
      RxwebValidators.required({ message: 'Pole jest wymagane' }),
    ]),
    rememberMe: new FormControl(false),
  });
};

const Template: Story = (args) => {
  const loginFormGroup = buildRxForm();

  loginFormGroup.valueChanges.subscribe((value: any) =>
    action('form')(JSON.stringify(value))
  );

  return {
    moduleMetadata: {
      imports: [
        WebSharedMaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        WebSharedDomainModule,
      ],
      declarations: [LoginComponent],
    },
    component: LoginComponent,
    template: `<app-login-form [loginForm]="loginForm" (submited)="onSubmit($event)"></app-login-form>`,
    props: {
      ...args,
      loginForm: loginFormGroup,
    },
  };
};

export const Default = Template.bind({});

const buildRxFormWithError = () => {
  const builder = new RxFormBuilder();

  const group = builder.group({
    userName: new FormControl(null, [
      RxwebValidators.required({ message: 'Pole jest wymagane' }),
    ]),
    password: new FormControl(null, [
      RxwebValidators.required({ message: 'Pole jest wymagane' }),
    ]),
    rememberMe: new FormControl(false),
  });

  group.setErrors({
    invalidCredentials: { message: 'Niepoprawny login lub hasło' },
  });

  console.log(JSON.stringify(group.errors));

  return group;
};

/*
@Component({
  template: `<app-login-from [loginForm]="loginForm" (submited)="onComponentSubmit($event)"></app-login-from>`,
  selector: 'test-comp' 
})
export class TestComponent {

loginForm: IFormGroup<LoginData>
onSubmit = new EventEmitter<null>()

constructor() {
  const builder = new RxFormBuilder()
  this.loginForm = <IFormGroup<LoginData>>builder.group({
    'userName': new FormControl('',[RxwebValidators.required({message: 'Pole jest wymagane'})]),
    'password': new FormControl('',[RxwebValidators.required({message: 'Pole jest wymagane'})]),
    'rememberMe': new FormControl(false)
  })

}

onComponentSubmit() {
this.loginForm.setErrors({invalidCredentials: {message: 'Nieporawny login lub hasło'}})
this.onSubmit.emit(null)
}


}

export const ServerError: Story<LoginComponent> = (args) => {

    
  return {
  moduleMetadata: {
    imports: [WebSharedMaterialModule, ReactiveFormsModule, BrowserAnimationsModule, WebSharedDomainModule],
    declarations: [LoginComponent, TestComponent]
  },
  component: LoginComponent,
  template: `<test-comp></test-comp>`,
  props: {
      
  }
}
}

*/
