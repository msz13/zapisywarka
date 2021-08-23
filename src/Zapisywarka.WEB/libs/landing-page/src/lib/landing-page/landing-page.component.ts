import { Component, OnInit } from '@angular/core';
import { AuthService } from '@zapisywarka-client-aps/authentication/domain'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.login()
  }

  signUp() {
   this.auth.signUp()
  }

}
