import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { RegistrationFeatureModule } from '../registration-feature.module';
import { OffersService } from '../offers.service'
import { RegistrationFormContainer } from './registration-form.container';
import {MockComponent} from 'ng-mocks'
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { fakeAsync, tick } from '@angular/core/testing';
import { OfferDetails } from '../registration-form.model';
import { ReservationInput } from '../reservation.model';
import { RegistrationDataService } from '../registration-data.service.service';


describe('RegistrationForm.ContainerComponent', () => {
  let spectator: Spectator<RegistrationFormContainer>;
  const createComponent = createComponentFactory({
    component: RegistrationFormContainer,
    imports: [RegistrationFeatureModule],
    declarations: [MockComponent(RegistrationFormComponent)],
    mocks: [OffersService, RegistrationDataService],
    detectChanges: false
    
  });

  beforeEach(()=>{
    spectator = createComponent()
  })
  
  describe("registration form rendering", ()=>{

    it("should render registration form", ()=>{

      const offerDetatils: OfferDetails = {
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
      service.getOne.mockReturnValue(of(offerDetatils))     
      
      spectator.detectChanges()      

      const offer = spectator.query(RegistrationFormComponent)?.offer

      expect(offer).toEqual(offerDetatils)


    })
  })

  describe("reserve items", ()=>{

    it("should call reservation service", ()=>{
       
          const registrationService = spectator.inject(RegistrationDataService)

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
                    
          expect(registrationService.create).toHaveBeenCalledWith(reservation)
    })
  })
});


