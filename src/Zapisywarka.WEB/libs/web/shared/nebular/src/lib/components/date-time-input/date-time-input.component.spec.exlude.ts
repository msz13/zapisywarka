import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

/* eslint-disable */

@Component({
  selector: 'app-host',
  template: '',
})
class HostComponent {
  @Input() set inputDate(value: string) {
    this.date.setValue(value);
  }

  date = new FormControl();
}

// describe('DateTimeInputComponent', () => {
//   let spectator: SpectatorHost<DateTimeInputComponent, HostComponent>;
//   const createHost = createHostFactory({
//     component: DateTimeInputComponent,
//     host: HostComponent,
//     imports: [
//       ThemeModule.forRoot(),
//       NbDatepickerModule.forRoot(),
//       ReactiveFormsModule,
//     ],

//     declareComponent: false,
//   });

//   it('create component', () => {
//     spectator = createHost(`<app-date-time-input></app-date-time-input>`);
//     expect(spectator.component).toBeDefined();
//   });

//   it('show placeholder', () => {
//     spectator = createHost(
//       `<app-date-time-input [placeholder]="'test'"></app-date-time-input>`
//     );

//     expect(spectator.query('input')).toHaveAttribute('placeholder', 'test');
//   });

//   it('doesnt show placeholder when doesnt defined', () => {
//     spectator = createHost(`<app-date-time-input></app-date-time-input>`);

//     expect(spectator.query('input')).toHaveAttribute('placeholder', '');
//   });

//   it('show calendar icon without value', () => {
//     spectator = createHost(
//       `<app-date-time-input [formControl]="date"></app-date-time-input>`
//     );
//     expect(spectator.queryHost('[nbPrefix]')).toExist();
//   });

//   it('sets value', () => {
//     spectator = createHost(
//       `<app-date-time-input [formControl]="date"></app-date-time-input>`
//     );

//     spectator.setHostInput({ inputDate: '2020-01-18 16:00' });
//     spectator.detectChanges();
//     spectator.fixture.whenStable();
//     expect(spectator.component.date.value).toBe('2020-01-18 16:00');
//     expect(spectator.queryHost('[nbPrefix]')).not.toExist();
//     expect(spectator.queryHost('[nbSuffix]')).toExist();
//   });
//   it.only.todo('clear input on cencel', () => {
//     spectator = createHost(
//       `<app-date-time-input [formControl]="date"></app-date-time-input>`
//     );
//     spectator.setHostInput({ inputDate: '2020-01-18 16:00' });
//     spectator.click('[nbButton]');
//     expect(spectator.query('input')).toBeEmpty();
//   });

//   it.todo('not show cencel when not enabled');
// });
