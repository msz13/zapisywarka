
import { createComponentFactory, Spectator, SpyObject } from '@ngneat/spectator/jest'
import { RegistrationFeatureModule } from '../registration-feature.module';
import { of } from 'rxjs';
import { cold, Scheduler } from 'jest-marbles'
import { RegistrationApiService } from '../domain/registrations/registration-api.service.service';
import { Location } from '@angular/common'
import { OffersApiService } from '../domain/offers/offers-api.service';
import { OffersService } from '../domain/offers/offers.service';
import { SpectacularAppComponent, SpectacularFeatureRouter, SpectacularFeatureTestingModule } from '@ngworker/spectacular'
import { offerDetatilsListFixture } from '../utills/fixtures/offer-details-list';
import { RegistratonFormPage } from '../utills/page-objects/RegistratonFormPage';
import { reservationDetailsFixture } from '../utills/fixtures/reservationDetailsFixture'
import { reservationInputFixture } from '../utills/fixtures/ReservationInputFixture';


describe('RegistrationShellComponent', () => {
  let spectator: Spectator<SpectacularAppComponent>;
  let page: RegistratonFormPage
  let offerApiService: SpyObject<OffersApiService>
  let registrationApiService: SpyObject<RegistrationApiService>
  let router: SpectacularFeatureRouter
  let location: Location

  const createComponent = createComponentFactory({
    component: SpectacularAppComponent,
    imports: [SpectacularFeatureTestingModule.withFeature({
      featureModule: RegistrationFeatureModule,
      featurePath: 'oferty'
    })],
    providers: [OffersService],
    mocks: [OffersApiService, RegistrationApiService],
    detectChanges: false,

  });



  beforeEach(async () => {
    spectator = createComponent()
    page = new RegistratonFormPage(spectator)
    offerApiService = spectator.inject<OffersApiService>(OffersApiService)
    registrationApiService = spectator.inject(RegistrationApiService)
    router = spectator.inject(SpectacularFeatureRouter)
    location = spectator.inject(Location)

  });


  describe('render registration form', () => {


    it("should show offer data when user open offer registration form", async () => {

      offerApiService.getAll.mockReturnValue(of(offerDetatilsListFixture))
      const testOffer = offerDetatilsListFixture[0]

      await router.navigate(['oferty', '1'])

      spectator.detectChanges()

      expect(page.offerName()).toHaveText(testOffer.name)
      expect(page.offerItemsNames()).toEqual(testOffer.offerItems.map(item => item.name))

    })

    it('should save reservetation when user accepts it', async () => {
    
      offerApiService.getAll.mockReturnValue(of(offerDetatilsListFixture))

      registrationApiService.submitReservation.mockReturnValue(cold('--a', { a: reservationDetailsFixture }))

      await router.navigate(['oferty', '1'])

      spectator.detectChanges()

      expect(page.registrationLoader()).toBeNull()

      page.enterReceptionPassword("Kowalski")
      page.enterComments("Odbierze żona")
      page.reserveOfferItem('Bochenek tradycyjny', 3)
      page.reserveOfferItem('Foremkowy', 1)
      page.confirmReservation()

      
      expect(registrationApiService.submitReservation).toHaveBeenCalledWith("1", reservationInputFixture)
      expect(page.registrationLoader()).not.toBeNull()

      Scheduler.get().flush()
      await spectator.fixture.whenStable()
      expect(location.path()).toBe(`/oferty/1/rezerwacje/${reservationDetailsFixture.reservationNumber}`)
     
    })


  })


})

