import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TextFieldComponent } from '../text-field/text-field.component';

@Component({
  selector: 'sui-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFieldComponent extends TextFieldComponent {

  hidePassword = true

  changeVisibility() {
    this.hidePassword = !this.hidePassword
  }

}
