import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'reg-shell',
  template: ` <reg-form-container></reg-form-container> `,
  styleUrls: ['./registration-shell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationShellComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
