import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OffersService } from '../domain/offers/offers.service';

@Component({
  selector: 'reg-shell',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./registration-shell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationShellComponent implements OnInit {
  constructor(private offerService: OffersService) {
    this.offerService.loadOfferDetails()
  }

  ngOnInit(): void {
    
  }
}
