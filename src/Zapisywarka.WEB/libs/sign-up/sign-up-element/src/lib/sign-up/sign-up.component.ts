import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zapisywarka-client-aps-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations: [
    trigger('myInsertTrigger', [
      transition(':enter', [
        style({ transform: 'translateX(40%)' }),
        animate('500ms', style({ transform: 'translateX(0%)' }))
      ])
    ])
  ]
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showSignUpForm: boolean = false;

  validateAccessCode() {
    this.showSignUpForm = !this.showSignUpForm;
  }

}
