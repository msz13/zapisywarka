import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PasswordConfirmationMatcher } from '../sign-up/sign-up-form-validator';

export interface UserData {
  userName: string;
  password: string;
}

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SignUpFormComponent {
  @Input() userDataControl!: FormGroup;
  @Output() userData = new EventEmitter<UserData>();

  passwordConfirmationMatcher = new PasswordConfirmationMatcher();

  getErrorMessages(field: string): string[] {
    if (field == 'password') {
      return ['Hasło jest wymagane'];
    } else if (field == 'samePasswords') {
      const errors = this.userDataControl.errors;
      console.log(JSON.stringify(errors));
      return [errors?.passwordNotMatchedConfirmation.message];
    } else {
      return ['Potwierdzenie hasła jest wymagane'];
    }
  }

  onSubmit() {
    if (this.userDataControl.valid) {
      this.userData.emit(this.userDataControl.value);
    }
  }

  get userName() {
    return this.userDataControl.get('userName');
  }
}
