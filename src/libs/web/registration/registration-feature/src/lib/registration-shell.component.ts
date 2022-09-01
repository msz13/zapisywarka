import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OffersService } from './domain/offers/offers.service';

@Component({  
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'reg-shell',
  template: `<router-outlet></router-outlet>`,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationShellComponent implements OnInit {
  constructor(private offerService: OffersService) {
    
  }

  ngOnInit(): void {
    this.offerService.loadOfferDetails()
  }
}
