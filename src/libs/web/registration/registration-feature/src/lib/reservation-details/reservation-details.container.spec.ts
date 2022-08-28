import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { ReservationDetailsComponent } from './reservation-details.component';

describe('ReservationDetailsComponent', () => {
  let spectator: Spectator<ReservationDetailsComponent>;
  const createComponent = createComponentFactory(ReservationDetailsComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
