import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Offer, OfferItem } from '@zapisywarka-client-aps/offers/domain';



@Component({
  selector: 'app-offer-confirmation',
  templateUrl: './offer-confirmation.component.html',
  styleUrls: ['./offer-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferConfirmationComponent implements OnInit {

  @Input() offer: Offer 
  @Input() offerItems:OfferItem[]

  constructor() { }

  ngOnInit(): void {
  }

  check() {
    console.log('log z button'+JSON.stringify(this.offerItems))
  }
}
