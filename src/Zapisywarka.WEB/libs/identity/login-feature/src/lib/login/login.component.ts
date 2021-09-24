import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login-from',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  @Input() loginForm!: FormGroup

  @Output() submited: EventEmitter<null> = new EventEmitter()

  hidePassword: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submited.emit(null)
  }

}
