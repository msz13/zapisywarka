import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-edit-icon',
  templateUrl: './edit-icon.component.html',
  styleUrls: ['./edit-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditIconComponent {
  @Output() clicked = new EventEmitter();

  onClick() {
    this.clicked.emit();
  }
}
