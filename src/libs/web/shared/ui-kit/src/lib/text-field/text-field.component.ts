import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sui-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextFieldComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
