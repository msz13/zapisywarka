import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'isui-identity-card',
  template: ` <mat-card data-test="sign-up">
  <mat-card-title class="title">
    Zapisywarka
    <mat-progress-bar
     *ngIf="loadind"
      mode="indeterminate"
      data-test="loading-indicator"
    >
    </mat-progress-bar>
    <mat-card-content>
      <ng-content></ng-content>
    </mat-card-content>
  </mat-card-title>
  </mat-card>`,
  styleUrls: ['./identity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityCardComponent  {  

  @Input() loadind = false
 
}
