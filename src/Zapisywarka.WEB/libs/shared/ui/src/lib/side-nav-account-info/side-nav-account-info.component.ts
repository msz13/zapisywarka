import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav-account-info',
  templateUrl: './side-nav-account-info.component.html',
  styleUrls: ['./side-nav-account-info.component.scss']
})
export class SideNavAccountInfoComponent implements OnInit {

  @Input() accauntName: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
