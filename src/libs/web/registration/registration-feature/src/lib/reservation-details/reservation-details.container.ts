import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'zapisywarka-reservation-details',
  template: `
    <p>
      reservation-details works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationDetailsContainer implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
