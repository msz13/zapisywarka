import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { RegistrationApiService } from './registration-data.service.service';
import { RegistrationService } from './registration.service';
import { reservationInputFixture } from '../../utills/ReservationInputFixture'
import { SpyObject } from '@ngneat/spectator/jest';
import { of } from 'rxjs'
import exp = require('constants');
import { cold, Scheduler } from 'jest-marbles';

describe('RegistrationService', () => {
  let spectator: SpectatorService<RegistrationService>;
  let apiService: SpyObject<RegistrationApiService>
  const createService = createServiceFactory({
    service: RegistrationService,
    mocks: [RegistrationApiService]
  });

  beforeEach(() => {
    spectator = createService()
    apiService = spectator.inject(RegistrationApiService)
  });

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('submit reservation', ()=>{

    it('should save data through api', ()=>{
      
      apiService.submitReservation.mockReturnValue(of(true))

      spectator.service.submitReservation("1", reservationInputFixture)

      expect(apiService.submitReservation).toHaveBeenCalledWith("1", reservationInputFixture)
      
    })

    it('should set loading while submitting', ()=>{
      
      apiService.submitReservation.mockReturnValue(cold('--a', {a: true}))
      
      const spy = jest.fn()
      spectator.service.loading$.subscribe(spy)

            
      spectator.service.submitReservation("1", reservationInputFixture)
      Scheduler.get().flush()

      
      expect(spy).toHaveBeenNthCalledWith(1, false)
      expect(spy).toHaveBeenNthCalledWith(2, true)
      expect(spy).toHaveBeenNthCalledWith(3, false)
      

      

      

    })


  })
});


