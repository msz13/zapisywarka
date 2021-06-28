import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpFormComponent implements OnInit {

  @Input() userForm!: FormGroup

  constructor() { }

  ngOnInit(): void {
  }

  getErrorMessage(field: string) {

    if(field == "name") {
      return "Nazwa użytkownika jest wymagana"
    } else {
      return "Hasło jest wymagane"
    }

    
  }

}
