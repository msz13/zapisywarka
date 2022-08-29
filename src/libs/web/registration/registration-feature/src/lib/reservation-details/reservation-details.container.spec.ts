import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { ReservationDetailsContainer } from './reservation-details.container';

describe('ReservationDetailsComponent', () => {
  let spectator: Spectator<ReservationDetailsContainer>;
  const createComponent = createComponentFactory(ReservationDetailsContainer);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
