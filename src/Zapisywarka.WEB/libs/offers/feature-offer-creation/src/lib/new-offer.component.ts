import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Offer, OfferItem } from '@zapisywarka-client-aps/offers/domain';
import { NbDateService, NbWindowService } from '@nebular/theme';
import { NgFormsManager } from '@ngneat/forms-manager';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OffersService } from '@zapisywarka-client-aps/offers/domain';

@Component({
  selector: 'new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.scss'],
})
export class NewOfferComponent implements OnInit {
  offer: Offer;

  minDate: Date;

  get offerBasicData() {
    return this.formsManager.getControl(
      'offerBasicData'
    ) as unknown as FormGroup;
  }

  $offerItems: Observable<any>;

  constructor(
    private dateService: NbDateService<Date>,
    private offersService: OffersService,
    private formsManager: NgFormsManager
  ) {
    this.minDate = this.dateService.addDay(this.dateService.today(), 0);
  }

  publishOffer(offer: Offer) {
    offer.offerItems = this.formsManager.getControl('offerItems').value;
    this.offersService.publishOffer(offer);
  }

  ngOnInit(): void {
    this.formsManager
      .valueChanges('offerBasicData')
      .subscribe((form) => (this.offer = form));
    this.$offerItems = this.formsManager
      .controlChanges('offerItems')
      .pipe(map((f) => f.rawValue));
  }

  submit(): void {
    console.log(
      'from button' +
        JSON.stringify(this.formsManager.getControl('offerItems').value)
    );
  }

  openSelection() {}
}
