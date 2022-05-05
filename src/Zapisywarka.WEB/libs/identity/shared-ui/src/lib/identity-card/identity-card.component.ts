import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'zapisywarka-client-aps-identity-card',
  templateUrl: './identity-card.component.html',
  styleUrls: ['./identity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
