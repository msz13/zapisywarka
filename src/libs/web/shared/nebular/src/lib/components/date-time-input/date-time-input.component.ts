import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
} from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'zapisywarka-client-aps-date-time-input',
  templateUrl: './date-time-input.component.html',
  styleUrls: ['./date-time-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimeInputComponent),
      multi: true,
    },
  ],
})
export class DateTimeInputComponent implements OnInit, ControlValueAccessor {
  date = new FormControl();

  @Input() placeholder = '';

  @Input() cancelEnabled = true;

  @Input() status = 'basic';

  minDate: Date;

  /* eslint-disable */
  onChange = (_: any) => {};

  onBlur = () => {};
  /* eslint-enable */

  writeValue(date: any): void {
    this.date.setValue(date);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onBlur = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  clear() {
    this.date.reset();
  }

  ngOnInit(): void {
    this.date.valueChanges.subscribe((value) => this.onChange(value));

    this.minDate = this.today();
  }

  today() {
    const dt = new Date();
    dt.setDate(dt.getDate() - 1);
    return dt;
  }
}
