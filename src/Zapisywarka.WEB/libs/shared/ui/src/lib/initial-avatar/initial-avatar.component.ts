import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-initial-avatar',
  templateUrl: './initial-avatar.component.html',
  styleUrls: ['./initial-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InitialAvatarComponent implements OnInit {

  _initial: string = ''
  
  @Input() set content(value: string) {

    this._initial = value[0]
  }

  constructor() { }


  ngOnInit(): void {
  }

}
