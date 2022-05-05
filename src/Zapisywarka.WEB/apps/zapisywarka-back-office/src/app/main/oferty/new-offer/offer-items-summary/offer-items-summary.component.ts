import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-offer-items-summary',
  templateUrl: './offer-items-summary.component.html',
  styleUrls: ['./offer-items-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferItemsSummaryComponent implements OnInit {

  @Input() totalQuantity
  @Input() totalValue
  
  constructor() { }

  ngOnInit(): void {
  }

}
