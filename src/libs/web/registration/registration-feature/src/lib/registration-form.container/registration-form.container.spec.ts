import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { RegistrationFeatureModule } from '../registration-feature.module';
import { RegistrationFormContainer } from './registration-form.container';
import {MockComponent} from 'ng-mocks'
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { OfferDetails } from '../domain/offers/offer.model';
import { ReservationInput } from '../domain/registrations/reservation.model';
import { OffersService } from '../domain/offers/offers.service'
import { RegistrationDataService } from '../domain/registrations/registration-data.service.service';



describe('RegistrationFormContainer', () => {
  let spectator: Spectator<RegistrationFormContainer>;
  const createComponent = createComponentFactory({
    component: RegistrationFormContainer,
    imports: [RegistrationFeatureModule],
    declarations: [MockComponent(RegistrationFormComponent)],
    mocks: [OffersService, RegistrationDataService],
    detectChanges: false,
  
    
  });

  beforeEach(()=>{
    spectator = createComponent()
    spectator.fixture.whenStable()
  })
  
  describe("registration form rendering", ()=>{

    it("should render registration form", ()=>{

      const offerDetatils: OfferDetails = {
        id: "1",
        name: "Wtorek",
        offerItems: [ 
        {
          offerItemId: "1",

          name: 'Bochenek tradycyjny'
        },
        {
          offerItemId: "1",
          name: 'Bochenek francuski'
        },
        ]
      }
      const service = spectator.inject<OffersService>(OffersService)
      
      service.selectedOffer$ = of(offerDetatils)
      
      spectator.detectChanges() 
      
      expect(service.loadOfferDetails).toHaveBeenCalled()

      const offer = spectator.query(RegistrationFormComponent)?.offer

      expect(offer).toEqual(offerDetatils)


    })
  })

  describe("reserve items", ()=>{

    it("should call reservation service", ()=>{

      const offerDetatils: OfferDetails = {
        id: "1",
        name: "Wtorek",
        offerItems: [ 
        {
          offerItemId: "1",

          name: 'Bochenek tradycyjny'
        },
        {
          offerItemId: "1",
          name: 'Bochenek francuski'
        },
        ]
      }

       
          const registrationService = spectator.inject(RegistrationDataService)
          const service = spectator.inject<OffersService>(OffersService)
          service.selectedOffer$ = of(offerDetatils)
          service.getSelectedOfferId.mockReturnValue("1")

          const registrationForm = spectator.query(RegistrationFormComponent)
          const reservation: ReservationInput = {            
            receptionPassword: "test",
            comments: "test comment",
            reservedItems: [
              {
                offerItemId: "1",
                quantity: 1
              }
            ]
          }

          registrationForm?.reservation.emit(reservation)
                    
          expect(registrationService.create).toHaveBeenCalledWith(offerDetatils.id, reservation)
    })
  })
});


