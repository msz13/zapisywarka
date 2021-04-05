import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'oferty',
  templateUrl: './oferty.component.html',
  styleUrls: ['./oferty.component.scss']
})
export class OfertyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateNewOffer(): void {
    this.router.navigate(["main/nowa-oferta"])
  }

}
