import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainComponent implements OnInit {

  accauntName: string = "Bochenek"

  constructor() { }

  ngOnInit(): void {
  }

}
