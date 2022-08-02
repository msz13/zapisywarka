import { Directive, ElementRef, HostListener } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[appCurrency]',
})
export class AppCurrencyDirective {
  constructor(
    private el: ElementRef<HTMLInputElement>,
    private pipe: DecimalPipe
  ) {
    this.el.nativeElement.type = 'number';
    this.el.nativeElement.className = 'input-no-arrows';
  }

  @HostListener('blur') formatValue() {
    //this.el.nativeElement.value = Number(this.el.nativeElement.value).toFixed(2)
    this.el.nativeElement.value = this.pipe.transform(
      this.el.nativeElement.value,
      '1.2'
    );
  }
}
