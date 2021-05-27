import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@zapisywarka-client-aps/authentication/domain';
import { OAuthStorage } from 'angular-oauth2-oidc';

@Component({
  selector: 'zapisywarka-client-aps-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private storage: OAuthStorage) { }

  ngOnInit(): void {

    this.storage.removeItem('access_token')
   
    
  }

}
