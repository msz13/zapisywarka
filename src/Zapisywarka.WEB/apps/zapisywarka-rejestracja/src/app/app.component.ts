import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'zapisywarka-client-aps-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'zapisywarka-rejestracja';
  accauntName = 'Bochenek';

  constructor(private router: Router) {}
  ngOnInit(): void {}
}
