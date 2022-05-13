import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'sui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {
  @Input() userName = '';
  @Output() toggleMenu = new EventEmitter();

    onClick() {
    this.toggleMenu.emit(undefined);
  }
}
