import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'reg-shell',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./registration-shell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationShellComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
