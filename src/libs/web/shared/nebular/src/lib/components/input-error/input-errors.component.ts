import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'npx-input-errors',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class InputErrorsComponent implements OnInit {
  @Input() errors: unknown;

  get keys() {
    return Object.keys(this.errors);
  }

  
  ngOnInit(): void {
    if (!this.errors) {
      throw 'Error property is empty';
    }
  }
}
