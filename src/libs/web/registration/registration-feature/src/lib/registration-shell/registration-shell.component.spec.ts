
import { RegistrationShellComponent } from './registration-shell.component';
import { createRoutingFactory, SpectatorRouting, SpyObject} from '@ngneat/spectator/jest'
import { byTestId, byTextContent } from '@ngneat/spectator';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegistrationFeatureModule } from '../registration-feature.module';
import { OffersService } from '../offers.service';
import { of } from 'rxjs';
import { OfferDetails } from '../registration-form.model';
import { RegistrationDataService } from '../registration-data.service.service';
import { ReservationInput } from '../reservation.model'

export class RegistratonFormPage { 
    
  constructor(private fixture: SpectatorRouting<RegistrationShellComponent>) {}

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

describe('RegistrationShellComponent', () => {
  let spectator: SpectatorRouting<RegistrationShellComponent>;  
  let page: RegistratonFormPage
  let dataService: SpyObject<OffersService>

  const createComponent = createRoutingFactory({
    component: RegistrationShellComponent, 
    imports: [ RegistrationFeatureModule, HttpClientTestingModule],
    mocks: [OffersService, RegistrationDataService],
    detectChanges: false
    
  });

 
  beforeEach(() => {
      spectator = createComponent()
      page = new RegistratonFormPage(spectator) 
      dataService = spectator.inject<OffersService>(OffersService)     
  });


  describe('render registration form', ()=>{

    it("should show offer data when user open offer registration form", ()=>{

      testOffer.name = "Wtorek,23.08.22"
      

      dataService.getOne.mockReturnValue(of(testOffer))
      
      spectator.detectChanges()
           
      expect(page.offerName()).toHaveText(testOffer.name)  
      expect(page.offerItemsNames()).toEqual(testOffer.offerItems.map(item => item.name))         
      
    })

    it('should save reservetation when user accepts it', ()=>{
      dataService.getOne.mockReturnValue(of(testOffer))
      const registrationService = spectator.inject(RegistrationDataService)
          
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
      //TODO should redirect after submit

    })

  /*   it.skip("should show reservation detail after reservation is succesfully submited", ()=> {
      dataService.getOne.mockReturnValue(of(testOffer))
      const registrationService = spectator.inject(RegistrationDataService)
      registrationService.create.mockReturnValue(of(id: "1"))  //TODO jakie powinien być swracany typ
          
      spectator.detectChanges()

      page.enterReceptionPassword("Kowalski")
      page.enterComments("Odbierze żona")

      page.reserveOfferItem('Bochenek tradycyjny', 3)
      page.reserveOfferItem('Foremkowy', 1)

      page.confirmReservation()

      const location = spectator.inject(Location)
      expect(location).toBe('rezerwacje/1')
      //TO do nowego pliku testowego dla test details
      expect(page.reservedItems()).toBe([{name: "Bochenek tradycyjny", quantity: 3}, {name: "Foremkowy", quantity: 1}])
      expect(page.comments).toBe("Odbierze żona")
      expect(page.receptionPassword).toBe("Kowalski")
    }) */
  }) 


})

