import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import {UserService} from '../user-service.service'

@Component({
  selector: 'app-sign-up',
  template: `
    <app-sign-up-form [userForm]="userForm" (userSubmited)="onSubmit()"></app-sign-up-form>
  `,
  styleUrls: ['./sign-up.container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpContainerComponent implements OnInit {

  userForm: FormGroup

  constructor(private userService: UserService, fb: FormBuilder) { 
    this.userForm = fb.group({
      accessCode: [''],
      userName: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.createUser(this.userForm.value).subscribe()
  }

}
