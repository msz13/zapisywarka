import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTimePickerComponent implements OnInit {

  currentDate = new Date()

  hours = ['10:00', '10:30', '11:00']
  
  constructor() { }

  ngOnInit(): void {
  }

}
