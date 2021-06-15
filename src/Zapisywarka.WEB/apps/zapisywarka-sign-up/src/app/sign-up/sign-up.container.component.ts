import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import {UserService} from '../user-service.service'

@Component({
  selector: 'app-sign-up',
  template: `
    <app-sign-up-form 
      [userForm]="userForm" 
      (userSubmited)="onSubmit()"
      [loading]="loading"
      >
    </app-sign-up-form>
  `,
  styleUrls: ['./sign-up.container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpContainerComponent implements OnInit {

  userForm: FormGroup
  loading: boolean = false

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
    this.loading = true
    this.userService.createUser(this.userForm.value).subscribe(()=>{
      this.redirectToApp()
    })
  }
  
  redirectToApp() {
    window.location.href = "/"
  }
  

}

