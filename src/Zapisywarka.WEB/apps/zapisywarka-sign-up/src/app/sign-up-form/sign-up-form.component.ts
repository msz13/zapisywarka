import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SignUpFormValidators } from '../sign-up/sign-up-form-validator';

export interface UserData {
  userName: string,
  password: string
}

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SignUpFormComponent implements OnInit {

  @Input() userDataControl!: FormGroup 
  @Output() userData = new EventEmitter<UserData>()

  $errorMessages!: Observable<string[]> | undefined

  constructor() { }

  ngOnInit(): void {
    this.$errorMessages = this.userDataControl.get('userName')?.valueChanges.pipe(tap(()=> console.log('value changes')), map(()=> SignUpFormValidators.getErrorMessagesFor('userName', this.userDataControl)))
  }

  getErrorMessages(field: string): string[] {
  
    if(field == "password") {
      return ["Hasło jest wymagane"]
    } else
    {
      return ["Potwierdzenie hasła jest wymagane"]
    }
    
  }

  onSubmit() {
    if(this.userDataControl.valid) {
      this.userData.emit(this.userDataControl.value)  
    }
    
  }

  get userName() {
    return this.userDataControl.get('userName')
  }

}
