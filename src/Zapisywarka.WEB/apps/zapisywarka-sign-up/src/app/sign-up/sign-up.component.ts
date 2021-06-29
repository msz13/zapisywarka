import { animate, query, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user-service.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations: [
    trigger('myInsertTrigger', [
      transition(':enter', [        
        query('.form-container', [ style({ transform: 'translateX(100%)' }), animate('500ms', style({ transform: 'translateX(0%)' })) ])
        
      ])
    ])
  ]
})
export class SignUpComponent implements OnInit {

  userForm: FormGroup = this.fb.group({
    accessCode: ['', Validators.required],
    userData: this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  })

  @Output() userSubmited = new EventEmitter()

  @Input() loading!: boolean

  constructor(private fb: FormBuilder) { }
  

  ngOnInit(): void {
  }

  showSignUpForm: boolean = false;

  validateAccessCode() {
   
    this.userForm.get('accessCode')?.markAsTouched()

   if(this.userForm.get('accessCode')?.valid) {
    this.showSignUpForm = !this.showSignUpForm;
   }
   
    
  }

  onSubmit() {
    
    if(this.userForm.valid) {

      const accessCode = this.userForm.get('accessCode')?.value
      const { userName, password } = this.userForm.get('userData')?.value
       
      const user: User = {
        accessCode,
        userName,
        password

      }
      
      this.userSubmited.emit(user)
    }    
  }

  getErrorMessage() {
      return "Kod dostępu jest wymagany"
  }

  get userData() {

    return this.userForm.get('userData') as FormGroup
  }

}
