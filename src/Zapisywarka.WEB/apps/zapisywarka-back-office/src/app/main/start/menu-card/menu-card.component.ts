import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuCardComponent implements OnInit {
  @Input() menuItem: NbMenuItem;

  constructor() {}

  ngOnInit(): void {}
}
