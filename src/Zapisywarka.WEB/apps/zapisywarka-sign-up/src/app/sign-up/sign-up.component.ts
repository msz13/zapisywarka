import { animate, query, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../sign-up-form/sign-up-form.component';
import { User } from '../user-service.service';
import { SignUpFormValidators } from './sign-up-form-validator';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations: [
    trigger('myInsertTrigger', [
      transition(':enter', [
        query('.form-container', [style({ transform: 'translateX(100%)' }), animate('500ms', style({ transform: 'translateX(0%)' }))])

      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

  accessCodeControl = new FormControl('', Validators.required)

  userData: FormGroup = this.fb.group({
    userName: ['', SignUpFormValidators.userNameValidators()],
    password: ['', SignUpFormValidators.passwordValidators()],
    passwordConfirmation: ['', SignUpFormValidators.passwordConfirmationRequired]
  }, {validators: SignUpFormValidators.correctPasswordConfirmationValidator})


  @Output() userSubmited = new EventEmitter()

  @Input() loading!: boolean
  @Input() error!: Error | null

  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {   
  }

  showSignUpForm: boolean = false;

  validateAccessCode() {

    this.accessCodeControl.markAsTouched()
    

    if (this.accessCodeControl.valid) {
      this.showSignUpForm = !this.showSignUpForm;
    }

  }

  onSubmit(userData: UserData) {

    const accessCode = this.accessCodeControl.value
    const { userName, password } = userData

    

    const user: User = {
      accessCode,
      userName,
      password
    }

    this.userSubmited.emit(user)
  }

  


  getErrorMessage() {
    return "Kod dostępu jest wymagany"
  }


}

