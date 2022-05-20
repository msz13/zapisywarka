import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserData } from '../sign-up-form/sign-up-form.component';
import { User } from '@zapisywarka-client-aps/web-identity-domain';
import { SignUpFormValidators } from './sign-up-form-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations: [
    trigger('myInsertTrigger', [
      transition(':enter', [
        query('.form-container', [
          style({ transform: 'translateX(100%)' }),
          animate('500ms', style({ transform: 'translateX(0%)' })),
        ]),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  accessCodeControl = new FormControl('', Validators.required);

  showSignUpForm = false;

  userData: FormGroup = this.fb.group(
    {
      userName: ['', SignUpFormValidators.userNameValidators()],
      password: ['', SignUpFormValidators.passwordValidators()],
      passwordConfirmation: [
        '',
        SignUpFormValidators.passwordConfirmationRequired,
      ],
    },
    { validators: SignUpFormValidators.correctPasswordConfirmationValidator }
  );

  @Output() userSubmited = new EventEmitter();

  @Input() loading!: boolean;
  @Input() error!: Error | null;

  constructor(private fb: FormBuilder) {}

  validateAccessCode() {
    this.accessCodeControl.markAsTouched();

    if (this.accessCodeControl.valid) {
      this.showSignUpForm = !this.showSignUpForm;
    }
  }

  onSubmit(userData: UserData) {
    const accessCode = this.accessCodeControl.value;
    const { userName, password } = userData;

    const user: User = {
      accessCode,
      userName,
      password,
    };

    this.userSubmited.emit(user);
  }

  getErrorMessage() {
    return 'Kod dostępu jest wymagany';
  }
}
