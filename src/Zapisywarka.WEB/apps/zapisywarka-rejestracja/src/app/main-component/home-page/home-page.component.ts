import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {MENU_ITEMS, MenuItem} from '../menu-items'

@Component({
  selector: 'zapisywarka-client-aps-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {

  menuItems: MenuItem[] = MENU_ITEMS

  constructor() { }

  ngOnInit(): void {
  }

  navigate(link: string) {
    
  }

}
