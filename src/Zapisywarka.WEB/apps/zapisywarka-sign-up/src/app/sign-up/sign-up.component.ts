import { animate, query, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../sign-up-form/sign-up-form.component';
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

  accessCodeControl = new FormControl('', Validators.required)

  userData: FormGroup = this.fb.group({
     userName: ['', Validators.required],
     password: ['', Validators.required],
     passwordConfirmation: ['', Validators.required]
    })
  

  @Output() userSubmited = new EventEmitter()

  @Input() loading!: boolean

  constructor(private fb: FormBuilder) { }
  

  ngOnInit(): void {
  }

  showSignUpForm: boolean = false;

  validateAccessCode() {
   
    this.accessCodeControl.markAsTouched()

   if(this.accessCodeControl.valid) {
    this.showSignUpForm = !this.showSignUpForm;
   }   
    
  }

  onSubmit(userData: UserData) {

    const accessCode = this.accessCodeControl.value
    const { userName, password } = userData

    const user: User = {
      accessCode,
      userName,
      password
    }

    this.userSubmited.emit(user)
  }   

    /*    
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
    
    */
  

  getErrorMessage() {
      return "Kod dostępu jest wymagany"
  }
 

}
