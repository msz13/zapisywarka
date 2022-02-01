import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-input-errors',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class InputErrorsComponent implements OnInit {
  @Input() errors: any;

  get keys() {
    return Object.keys(this.errors);
  }

  constructor() {}

  ngOnInit(): void {
    if (!this.errors) {
      throw 'Error property is empty';
    }
  }
}
