import { animate, query, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  userForm: FormGroup 

  @Output() userSubmited = new EventEmitter()

  @Input() loading!: boolean

  constructor(private fb: FormBuilder) { 

    this.userForm = this.fb.group({
      accessCode: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

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
      this.userSubmited.emit(this.userForm.value)
    }    
  }

  getErrorMessage() {
      return "Kod dostępu jest wymagany"
  }
}
