
import { LoginComponent } from './login.component';
import {SharedMaterialModule} from '@zapisywarka.web/material'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SharedDomainModule } from '@zapisywarka-client-aps/shared/domain';

export default {
  title: 'LoginComponent',
  argTypes: { submited: {action: 'submit'}}
}

const loginFormGroup = new FormGroup({
  'userName': new FormControl(),
  'password': new FormControl(),
  'rememberMe': new FormControl()
})

export const Template<LoginComponent> = (args) => ({
  moduleMetadata: {
    imports: [SharedMaterialModule, ReactiveFormsModule, BrowserAnimationsModule, SharedDomainModule],
    declarations: [LoginComponent]
  },
  component: LoginComponent,
  template: `<app-login-from [loginForm]="loginForm"></app-login-from>`,
  props: {
    loginForm: loginFormGroup
  }
})

export const primary = () => ({
  moduleMetadata: {
    imports: [SharedMaterialModule, ReactiveFormsModule, BrowserAnimationsModule, SharedDomainModule],
    declarations: [LoginComponent]
  },
  component: LoginComponent,
  template: `<app-login-from [loginForm]="loginForm"></app-login-from>`,
  props: {
    loginForm: loginFormGroup
  }
})


const filledLoginFormGroup = new FormGroup({
  'userName': new FormControl("mateusz_szczecinski"),
  'password': new FormControl("12345678"),
  'rememberMe': new FormControl(true)
})


export const filled = () => ({
  moduleMetadata: {
    imports: [SharedMaterialModule, ReactiveFormsModule, BrowserAnimationsModule, SharedDomainModule],
    declarations: [LoginComponent]
  },
  component: LoginComponent,
  template: `<app-login-from [loginForm]="loginForm"></app-login-from>`,
  props: {
    loginForm: filledLoginFormGroup,

  }
})


const errorLoginFormGroup = new FormGroup({
  'userName': new FormControl(''),
  'password': new FormControl(''),
  'rememberMe': new FormControl(false)
})

const getErrorForm = ()=>{
  errorLoginFormGroup.get('userName')?.setErrors({required: {
    message: "Pole wymagane"
  }})
  
  errorLoginFormGroup.get('password')?.setErrors({required: {
    message: "Pole wymagane"
  }})

  errorLoginFormGroup.markAllAsTouched()

  return errorLoginFormGroup
}



export const withError = () => ({
  moduleMetadata: {
    imports: [SharedMaterialModule, ReactiveFormsModule, BrowserAnimationsModule, SharedDomainModule],
    declarations: [LoginComponent]
  },
  component: LoginComponent,
  template: `<app-login-from [loginForm]="loginForm"></app-login-from>`,
  props: {
    loginForm: getErrorForm()
  }
})