import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-name-input',
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NameInputComponent),
      multi: true,
    },
  ],
})
export class NameInputComponent implements OnInit, ControlValueAccessor {
  @Input() maxLength = 60;

  counterVisibility = false;

  counter: number;

  _value: string;

  set value(val) {
    if (val !== undefined && this._value !== val) {
      console.log('set value ', val);
      this._value = val;
      this.setCounter();
      this.onChanges(this._value);
    }
  }

  get value() {
    return this._value;
  }

  /* eslint-disable */
  onChanges: (_: any) => {};

  onTouch: () => {};

  /* eslint-enable */

  ngOnInit(): void {
    this.counter = this.maxLength;
  }

  onFocus() {
    this.counterVisibility = true;
  }

  onBlur() {
    this.counterVisibility = false;
    this.onTouch();
    console.log('touched');
  }

  setCounter() {
    this.counter = this.maxLength - this._value.length;
    console.log('set counter', this.counter);
  }

  writeValue(value: string): void {
    if (value != undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    console.log('function', JSON.stringify(fn));
    this.onChanges = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
