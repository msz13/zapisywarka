import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() userName: string = '';
  @Output() toggleMenu = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.toggleMenu.emit(undefined);
  }
}
