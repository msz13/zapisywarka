import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { password, prop, required } from '@rxweb/reactive-form-validators';
import { User, UserService } from '@zapisywarka-client-aps/web-identity-domain';
import { SignUpFormValidators } from './sign-up-form-validator';
import {RxFormBuilder} from '@rxweb/reactive-form-validators'

export class SignUpInput {
  
  @required({message: "Nazwa jest wymagana"})
  userName!: string

  @prop()
  password!: string
}

@Component({
  selector: 'isf-sign-up',
  templateUrl: './sign-up-container.component.html',
  styleUrls: ['./sign-up-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SignUpContainerComponent implements OnInit {

  userForm!: FormGroup
  error: Error | null = null

  constructor(/* private formBuilder: FormBuilder, */ private formBuilder: RxFormBuilder ,private userService: UserService) {}

 /*  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userName: this.formBuilder.control("", SignUpFormValidators.userNameValidators()),
      password: this.formBuilder.control("", SignUpFormValidators.passwordValidators),
      passwordConfirmation: this.formBuilder.control("", SignUpFormValidators.passwordConfirmationRequired)
    })
  } */

  ngOnInit(): void {
      this.userForm = this.formBuilder.formGroup(SignUpInput)
  }

  
  onSubmit() {    
    const { userName, password} = this.userForm.value as User
    console.log('us '+userName + ' ' + 'pass '+password)
    this.userService.createUser({userName, password}).subscribe({next: ()=> true, error: err => {     
      this.error = err.message}})
  }
}
