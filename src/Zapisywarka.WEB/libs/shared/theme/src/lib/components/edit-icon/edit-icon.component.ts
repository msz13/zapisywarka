import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-edit-icon',
  templateUrl: './edit-icon.component.html',
  styleUrls: ['./edit-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditIconComponent implements OnInit {

  @Output() click = new EventEmitter()
  
  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.click.emit()
  }

  

}
