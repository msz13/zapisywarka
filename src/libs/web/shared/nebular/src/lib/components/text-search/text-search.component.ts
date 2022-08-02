import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-text-search',
  templateUrl: './text-search.component.html',
  styleUrls: ['./text-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSearchComponent implements OnInit, OnDestroy {
  $destroy = new Subject();

  search = new FormControl();

  @Output() searchTerm = new EventEmitter<string>();


  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(300), takeUntil(this.$destroy))
      .subscribe((value) => this.searchTerm.emit(value));
  }

  ngOnDestroy(): void {
    this.$destroy.next();
  }
}
