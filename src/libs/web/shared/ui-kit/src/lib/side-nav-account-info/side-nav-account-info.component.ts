import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sui-side-nav-account-info',
  templateUrl: './side-nav-account-info.component.html',
  styleUrls: ['./side-nav-account-info.component.scss'],
})
export class SideNavAccountInfoComponent {
  @Input() accauntName = '';
}
