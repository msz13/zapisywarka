import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../../../main/menu-items';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  menu = MENU_ITEMS

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(route: string) {    
    this.router.navigate([route])
  }

}
