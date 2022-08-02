import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  OnDestroy,
  ComponentRef,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { NbInputDirective, NbComponentStatus } from '@nebular/theme';
import { NgControl } from '@angular/forms';
import { Observable, EMPTY, Subject, merge, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputErrorsComponent } from './input-errors.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[appControlError]',
})
export class AppControlErrorDirective implements OnInit, OnDestroy {
  private componentDestroyed: Subject<any> = new Subject();
  baseStatus: NbComponentStatus;
  ref: ComponentRef<InputErrorsComponent>;
  public touchObservableEvent: Observable<Event>;

  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private nbInput: NbInputDirective,
    private control: NgControl
  ) {
    this.setupEvents();
  }

  ngOnInit(): void {
    //this.baseStatus = this.nbInput.status;
    merge(
      this.touchObservableEvent,
      this.control.statusChanges,
      this.control.valueChanges
    )
      .pipe()
      .subscribe(() => this.setError());
  }

  setError() {
    if (this.control.errors) {
      if (!this.ref) {
        const factory =
          this.resolver.resolveComponentFactory(InputErrorsComponent);
        this.ref = this.vcr.createComponent(factory);
      }

      this.nbInput.status = 'danger';
    } else {
      this.vcr.clear();
      this.ref.destroy();

      this.nbInput.status = this.baseStatus;
    }
  }

  setupEvents() {
    this.touchObservableEvent = fromEvent(
      this.vcr.element.nativeElement,
      'blur'
    );
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }
}
