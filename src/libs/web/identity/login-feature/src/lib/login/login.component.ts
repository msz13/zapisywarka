import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { IFormGroup } from '@rxweb/types';
import { LoginCredentials } from '@zapisywarka-client-aps/web-identity-domain';

@Component({
  selector: 'ilf-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LoginComponent {
  loginForm!: FormGroup;

  @Input() loading = false;

  @Input() error: string | undefined;

  @Output() login: EventEmitter<LoginCredentials> = new EventEmitter();

  signUpPath = ['/sign-up'];

  hidePassword = true;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.loginForm = <IFormGroup<LoginCredentials>>this.fb.group({
      userName: [
        '',
        RxwebValidators.notEmpty({
          message: 'Nazwa użytkownika jest wymagana',
        }),
      ],
      password: [
        '',
        RxwebValidators.notEmpty({ message: 'Hasło jest wymagane' }),
      ],
      rememberMe: [false],
    }) as FormGroup;
  }

  onSubmit() {
    this.loginForm.markAsDirty();
    if (this.loginForm.valid && this.loginForm.value) {
      this.login.emit(this.loginForm.value);
    }
  }
}
