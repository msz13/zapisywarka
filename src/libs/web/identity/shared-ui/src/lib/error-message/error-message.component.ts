import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'isui-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent  {

  @Input() message!: string
  
}
