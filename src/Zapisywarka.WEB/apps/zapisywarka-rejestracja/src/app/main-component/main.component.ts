import { Component, OnInit } from '@angular/core';
import { SessionQuery } from '@zapisywarka-client-aps/identity/domain';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainComponent implements OnInit {

  accauntName!: string

  constructor(private sessionQuery: SessionQuery) { }

  ngOnInit(): void {
    console.debug('userName: '+this.sessionQuery.getValue().userName)
    this.accauntName = this.sessionQuery.getValue().userName
  }

}
