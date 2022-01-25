import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OfferItemView } from '@zapisywarka-client-aps/offers/domain';
import { Observable } from 'rxjs';
import { OfferCreationFormPresenterService } from './offer-creation-form-presenter.service';

@Component({
  selector: 'zapisywarka-client-aps-offer-creation-form',
  templateUrl: './offer-creation-form.component.html',
  styleUrls: ['./offer-creation-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferCreationFormComponent implements OnInit {

  constructor(private offerFormPresenter: OfferCreationFormPresenterService) { }

  offerItems$: Observable<OfferItemView>
  
  ngOnInit(): void {
    this.offerItems$ = this.offerFormPresenter.addedItem$()
  }

  addItem() {
    this.offerFormPresenter.addOfferItem()
  }


  

}
