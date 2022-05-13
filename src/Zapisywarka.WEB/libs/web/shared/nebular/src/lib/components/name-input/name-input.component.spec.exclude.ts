import { NameInputComponent } from './name-input.component';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import {
  NbFormFieldModule,
  NbInputModule,
  NbFormFieldComponent,
  NbThemeModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import {} from '@nebular/theme/components/shared/shared.module';
import { Component, Input } from '@angular/core';

// @Component({ selector: 'test-form', template: '' })
// class CustomHostComponent {
//   testName;
// }

// describe('NameInputComponent', () => {
//   let spectator: SpectatorHost<NameInputComponent>;
//   const createHost = createHostFactory({
//     component: NameInputComponent,
//     imports: [
//       NbThemeModule.forRoot(),
//       NbFormFieldModule,
//       NbInputModule,
//       ReactiveFormsModule,
//     ],
//   });

//   const createCustomHost = createHostFactory({
//     component: NameInputComponent,
//     host: CustomHostComponent,
//     imports: [
//       NbThemeModule.forRoot(),
//       NbFormFieldModule,
//       NbInputModule,
//       ReactiveFormsModule,
//       FormsModule,
//     ],
//   });

//   it('should create component', () => {
//     const host = createHost(`<app-name-input></app-name-input>`);
//     expect(host.query(NbFormFieldComponent)).toExist();
//   });

//   it('should not show counter on not dirty input', () => {
//     const host = createHost(`<app-name-input></app-name-input>`);
//     expect(host.query('.text-lenght-counter')).not.toExist();
//   });

//   it('should show counter on focus', () => {
//     const host = createHost(`<app-name-input></app-name-input>`);

//     host.focus('input');
//     expect(host.query('.text-lenght-counter')).toExist();
//   });

//   it('should hide counter on blur', () => {
//     const host = createHost(`<app-name-input></app-name-input>`);
//     host.focus('input');
//     host.blur('input');
//     expect(host.query('.text-lenght-counter')).not.toExist();
//   });

//   it('should show evaible length after input first letter', () => {
//     const host = createHost(
//       `<app-name-input [maxLength]="60"></app-name-input>`
//     );
//     host.focus('input');
//     host.typeInElement('a', 'input');
//     host.detectChanges();
//     expect(host.query('.text-lenght-counter')).toHaveText('59');
//   });

//   it('should show zero when type maxlenght text', () => {
//     const host = createHost(
//       `<app-name-input [maxLength]="10"></app-name-input>`
//     );
//     host.focus('input');
//     host.typeInElement('0123456789', 'input');
//     host.detectChanges();
//     expect(host.query('.text-lenght-counter')).toHaveText('0');
//   });

//   it('should assign maxlenth attribute ', () => {
//     const host = createHost(
//       `<app-name-input [maxLength]="60"></app-name-input>`
//     );

//     expect(host.query<HTMLInputElement>('input').maxLength).toBe(60);
//   });

//   it.only('should bind value from form control', () => {
//     const host = createCustomHost<CustomHostComponent>(
//       `<app-name-input [(ngModel)]="testName"></app-name-input>`
//     );

//     // host.query<HTMLInputElement>('input').value = "Specjalna"

//     host.typeInElement('Specjalna', 'input');

//     host.blur('input');

//     host.detectChanges();

//     expect(host.hostComponent.testName).toBe('Specjalna');
//   });

//   it.only('should display set value', () => {
//     const host = createCustomHost<CustomHostComponent>(
//       `<app-name-input [(ngModel)]="testModel"></app-name-input>`
//     );

//     host.hostComponent.testName = 'Świąteczna, promocyjna';
//     host.detectChanges();

//     expect(host.query<HTMLInputElement>('input').value).toBe('Świąteczna');
//   });
// });
