import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MENU_ITEMS, MenuItem } from '../menu-items';

@Component({
  selector: 'zapisywarka-client-aps-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent  {
  menuItems: MenuItem[] = MENU_ITEMS;

  navigate(link: string) { throw new Error("Not implemented  exception")}
}
