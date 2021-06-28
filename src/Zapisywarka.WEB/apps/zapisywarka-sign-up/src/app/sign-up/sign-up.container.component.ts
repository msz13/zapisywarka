import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {User, UserService} from '../user-service.service'
import { SignUpFormValidator } from './sign-up-form-validator';

@Component({
 
  template: `
    <app-sign-up
      (userSubmited)="onSubmit($event)"
      [loading]="loading"
      >
    </app-sign-up>
  `,
  styleUrls: ['./sign-up.container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpContainerComponent implements OnInit {

  
  loading: boolean = false

  constructor(private userService: UserService) {  }

  ngOnInit(): void {
  }

  onSubmit(event: User) {
    
      this.loading = true
      this.userService.createUser(event).subscribe(()=>{
      this.redirectToApp()
    })
    

    
  }
  
  redirectToApp() {
    window.location.href = "/"
  }
  

}

