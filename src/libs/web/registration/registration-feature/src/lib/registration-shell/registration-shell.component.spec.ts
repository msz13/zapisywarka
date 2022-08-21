
import { createRoutingFactory, Spectator, SpectatorRouting, SpyObject} from '@ngneat/spectator/jest'
import { byTestId, byTextContent } from '@ngneat/spectator';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegistrationFeatureModule } from '../registration-feature.module';
import { of } from 'rxjs';
import { OfferDetails } from '../domain/offers/offer.model';
import { RegistrationDataService } from '../domain/registrations/registration-data.service.service';
import { ReservationInput } from '../domain/registrations/reservation.model'
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { OffersApiService } from '../domain/offers/offers-api.service';
import { OffersService } from '../domain/offers/offers.service';


export class RegistratonFormPage { 
    
  constructor(private fixture: Spectator<TestAppComponent>) {}

  offerName() {
    return this.fixture.query(byTestId("form-name"))
  }

  offerItemsNames() {

    return this.fixture.queryAll(byTestId("offer-item"))
      .map(offerItem => offerItem.textContent)
  }

  reserveOfferItem(offerItemName: string, quantity: number) {
    const offeritem = this.fixture.query(byTextContent(offerItemName, {selector: '[data-testid=offer-item]'}))?.querySelector('input')
    if(!offeritem) {
      throw new Error(`can't find offer item with name: ${offerItemName}`)
    }
    this.fixture.typeInElement(quantity.toString(), offeritem)
  }

  enterComments(comments: string) {
     this.fixture.typeInElement(comments,'[data-testid=comments] input')
  }
  enterReceptionPassword(password: string) {
    this.fixture.typeInElement(password, '[data-testid=reception-password] input')
  } 

  confirmReservation() {
    this.fixture.click(byTestId("confirm-button"))
  }


}
  

const testOffer: OfferDetails = {
  id: "1",
  name: "Oferta testowa",
  offerItems: [
  {
    offerItemId: "1",
    name: 'Bochenek tradycyjny'
  },
  {
    offerItemId: "2",
    name: 'Bochenek francuski'
  },
  {
    offerItemId: "3",
    name: "Foremkowy"
  },
]
}

@Component({
  template: "<router-outlet></router-outlet>"
})
export class TestAppComponent {}

@Component({
  template: `<p class="test" >Test component works!</p>`
})
export class TestComponent {}

describe('RegistrationShellComponent', () => {
  let spectator: SpectatorRouting<TestAppComponent>;  
  let page: RegistratonFormPage
  let offerService: SpyObject<OffersApiService>
  let router: Router

  const createComponent = createRoutingFactory({
    component: TestAppComponent, 
    declarations: [TestAppComponent],
    imports: [ RegistrationFeatureModule, HttpClientTestingModule],
    providers: [OffersService],
    mocks: [OffersApiService, RegistrationDataService],    
    detectChanges: false,
    stubsEnabled: false,
    routes: [{path: 'oferty', pathMatch: 'full', loadChildren: ()=> RegistrationFeatureModule }]
    
  }); 

 
 
  beforeEach(async () => {
      spectator = createComponent()
      page = new RegistratonFormPage(spectator) 
      offerService = spectator.inject<OffersApiService>(OffersApiService)     
  
  });


  describe('render registration form', ()=>{

    it('opens page', fakeAsync(()=>{
      offerService.getById.mockReturnValue(of(testOffer))
      spectator.router.navigate(['oferty'])
      spectator.tick()
      expect(spectator.inject(Location).path()).toBe('/oferty')
    }))

    it.skip("should show offer data when user open offer registration form", fakeAsync(()=>{
        
      spectator.fixture.whenStable()

     // offerService.getById.mockReturnValue(of(testOffer))

        spectator.router.navigate(['oferty'])
        spectator.tick()
          
        expect(spectator.inject(Location).path()).toBe('/oferty')
           
       //spectator.detectChanges()
           
      expect(page.offerName()).toHaveText(testOffer.name)  
      expect(page.offerItemsNames()).toEqual(testOffer.offerItems.map(item => item.name))         
      
    }))

    it.skip('should save reservetation when user accepts it', fakeAsync(()=>{
      offerService.getById.mockReturnValue(of(testOffer))
      const registrationService = spectator.inject(RegistrationDataService)
      const location = spectator.inject(Location)
      
          
      spectator.detectChanges()

      page.enterReceptionPassword("Kowalski")
      page.enterComments("Odbierze żona")

      page.reserveOfferItem('Bochenek tradycyjny', 3)
      page.reserveOfferItem('Foremkowy', 1)

      page.confirmReservation()

      const expectedReservation: ReservationInput = {        
        receptionPassword: "Kowalski",
        comments: "Odbierze żona",
        reservedItems: [
          {
            offerItemId: "1",
            quantity: 3
          },
          { 
            offerItemId: "3",
            quantity: 1
          }
        ]
      }

      expect(registrationService.create).toHaveBeenCalledWith("1", expectedReservation)
      //TODO should load aftersubmit
      //TODO redirect to details expect(location.path()).toBe('/oferty/rejestracje/1')

    }))

 
  }) 


})

