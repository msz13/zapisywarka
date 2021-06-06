import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations: [
    trigger('myInsertTrigger', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms', style({ transform: 'translateX(0%)' }))
      ])
    ])
  ]
})
export class SignUpComponent implements OnInit {

  @Input() userForm!: FormGroup; 

  @Output() userSubmited = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  showSignUpForm: boolean = false;

  validateAccessCode() {
    this.showSignUpForm = !this.showSignUpForm;
  }

  onSubmit() {
    this.userSubmited.emit('')
  }

}
