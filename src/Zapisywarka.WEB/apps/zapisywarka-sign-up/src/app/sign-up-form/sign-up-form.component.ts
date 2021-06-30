import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface UserData {
  userName: string,
  password: string
}

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpFormComponent implements OnInit {

  @Input() userDataControl!: FormGroup 
  @Output() userData = new EventEmitter<UserData>()

  constructor() { }

  ngOnInit(): void {
  }

  getErrorMessage(field: string) {

    if(field == "name") {
      return "Nazwa użytkownika jest wymagana"
    } else if(field == "password") {
      return "Hasło jest wymagane"
    } else
    {
      return "Potwierdzenie hasła jest wymagane"
    }
    
  }

  onSubmit() {
    if(this.userDataControl.valid) {
      this.userData.emit(this.userDataControl.value)  
    }
    
  }

}
