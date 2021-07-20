import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {User, UserService} from '../user-service.service'


@Component({
 
  template: `
    <app-sign-up
      (userSubmited)="onSubmit($event)"
      [loading]="loading"
      [error]="error"
      >
    </app-sign-up>
  `,
  styleUrls: ['./sign-up.container.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SignUpContainerComponent implements OnInit {

  
  loading: boolean = false
  error: Error | null = null

  constructor(private userService: UserService) {  }

  ngOnInit(): void {
  }

  onSubmit(event: User) {
    
      this.loading = true
      this.userService.createUser(event).subscribe({
        next: (result)=>{
          if (result) {
            this.redirectToApp()
          }
        
        },
        error: (err: Error)=> this.error = err
      },)
    

    
  }
  
  redirectToApp() {
    window.location.href = "/"
  }
  

}

