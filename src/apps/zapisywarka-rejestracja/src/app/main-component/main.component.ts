import { Component, OnInit } from '@angular/core';
import { SessionQuery } from '@zapisywarka-client-aps/web-identity-domain';

@Component({
  selector: 'zapisywarka-client-aps-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss'],
})
export class MainComponent implements OnInit {
  accauntName!: string;

  constructor(private sessionQuery: SessionQuery) {}
//comment
  ngOnInit(): void {
    this.accauntName = this.sessionQuery.getValue().userName;
  }
}
