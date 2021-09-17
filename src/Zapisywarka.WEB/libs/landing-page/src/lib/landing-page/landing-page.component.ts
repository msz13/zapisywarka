import { Component, OnInit } from '@angular/core';
import { AuthService } from '@zapisywarka-client-aps/identity/domain'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

 
}
