import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-containter',
  template: `<p>login-container works!{{test}}</p>
  <button (click)="onClick()">test</button>
  `,
  styles: [],
})
export class LoginContainerComponent implements OnInit {
  constructor() {}

  @Input() test!: string 
  @Output() clicked = new EventEmitter<string>()

  ngOnInit(): void {}

  onClick() {
    this.clicked.emit(this.test)
  }
}
