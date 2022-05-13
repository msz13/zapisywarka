import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'sui-initial-avatar',
  templateUrl: './initial-avatar.component.html',
  styleUrls: ['./initial-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitialAvatarComponent  {
  _initial = '';

  @Input() set content(value: string) {
    this._initial = value[0];
  }
  
}
