import { Component, OnInit } from '@angular/core';
import { AuthService } from '@zapisywarka-client-aps/authentication/domain';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainComponent implements OnInit {

  accauntName: string = "Bochenek"

  constructor(private auth: OAuthService) { }

  ngOnInit(): void {
  }

}
