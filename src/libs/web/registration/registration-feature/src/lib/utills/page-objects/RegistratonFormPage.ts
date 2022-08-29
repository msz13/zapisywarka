import { Spectator } from '@ngneat/spectator/jest';
import { byTestId, byTextContent } from '@ngneat/spectator';
import { SpectacularAppComponent } from '@ngworker/spectacular';



export class RegistratonFormPage {
  
 
  constructor(private fixture: Spectator<SpectacularAppComponent>) { }

  offerName() {
    return this.fixture.query(byTestId("form-name"));
  }

  offerItemsNames() {

    return this.fixture.queryAll(byTestId("offer-item"))
      .map(offerItem => offerItem.textContent);
  }

  reserveOfferItem(offerItemName: string, quantity: number) {
    const offeritem = this.fixture.query(byTextContent(offerItemName, { selector: '[data-testid=offer-item]' }))?.querySelector('input');
    if (!offeritem) {
      throw new Error(`can't find offer item with name: ${offerItemName}`);
    }
    this.fixture.typeInElement(quantity.toString(), offeritem);
  }

  enterComments(comments: string) {
    this.fixture.typeInElement(comments, '[data-testid=comments] input');
  }
  enterReceptionPassword(password: string) {
    this.fixture.typeInElement(password, '[data-testid=reception-password] input');
  }

  confirmReservation() {
    this.fixture.click(byTestId("confirm-button"));
  }

  registrationLoader() {
    return this.fixture.query(byTestId('registration-loader'))
  }


}
