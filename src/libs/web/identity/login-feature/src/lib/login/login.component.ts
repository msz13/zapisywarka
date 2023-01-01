import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { IFormGroup } from '@rxweb/types';
import { LoginCredentials } from '@zapisywarka-client-aps/web-identity-domain';

@Component({
  selector: 'ilf-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  @Input() loading: boolean | null = false;

  @Input() error: string | undefined;

  @Output() login: EventEmitter<LoginCredentials> = new EventEmitter();

  signUpPath = ['/sign-up'];


  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    if(!this.loading)
      throw new Error('Login form loading input is null')
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
    }) as UntypedFormGroup;
  }

  onSubmit() {
    console.log('submited called')
    this.loginForm.markAsDirty();
    if (this.loginForm.valid && this.loginForm.value) {
      this.login.emit(this.loginForm.value);
    }
  }
}
