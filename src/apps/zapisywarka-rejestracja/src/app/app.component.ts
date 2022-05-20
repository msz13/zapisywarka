import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'zapisywarka-client-aps-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'zapisywarka-rejestracja';
  accauntName = 'Bochenek';

  constructor(private router: Router) {}

}