import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { password, prop, required } from '@rxweb/reactive-form-validators';
import { User, UserService } from '@zapisywarka-client-aps/web-identity-domain';
import { PasswordConfirmationMatcher, SignUpFormValidators } from './sign-up-form-validator';


@Component({
  selector: 'isf-sign-up',
  templateUrl: './sign-up-container.component.html',
  styleUrls: ['./sign-up-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SignUpContainerComponent implements OnInit {

  userForm!: FormGroup
  error: string | null = null
  passwordConfirmationErrorStateMatcher = new PasswordConfirmationMatcher()

  constructor( private formBuilder: FormBuilder, private userService: UserService) {}

 ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userName: this.formBuilder.control("", SignUpFormValidators.userNameValidators()),
      password: this.formBuilder.control<string>("", SignUpFormValidators.passwordValidators()),
      passwordConfirmation: this.formBuilder.control("", SignUpFormValidators.passwordConfirmationRequired)          
    },
    { validators: SignUpFormValidators.correctPasswordConfirmationValidator })
   
 }

 

  
  onSubmit() {    
    const { userName, password} = this.userForm.value as User 
    const user = this.userForm.value  
    console.log(JSON.stringify(user)) 
    this.userService.createUser({userName, password}).subscribe({next: ()=> true, error: err => {     
      this.error = err.message}})
  }
}
