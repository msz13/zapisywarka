import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {IFormGroup} from '@rxweb/types'

export interface LoginData {
  userName: string,
  password: string,
  rememberMe: boolean
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  @Input() loginForm!: IFormGroup<LoginData>

  @Output() submited: EventEmitter<null> = new EventEmitter()

  signUpPath = ['/sign-up']

  hidePassword: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('submit from component')
    this.submited.emit(null)
  }

}
