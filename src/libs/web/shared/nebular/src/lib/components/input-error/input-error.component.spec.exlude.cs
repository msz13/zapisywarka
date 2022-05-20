import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputErrorsComponent } from './input-errors.component';
import { IterableDiffers } from '@angular/core';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import {
  SpectatorHost,
  createHostFactory,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { FormControl } from '@angular/forms';
import { NbThemeModule, NbIconComponent } from '@nebular/theme';
import { MockComponentDeprecated } from '@ngneat/spectator';

describe('input error component', () => {
  let spectator: Spectator<InputErrorsComponent>;
  const createComponent = createComponentFactory({
    component: InputErrorsComponent,
    declarations: [MockComponentDeprecated(NbIconComponent)],
  });
  let control: FormControl;

  it('should display one error', () => {
    const error = { isRequired: { message: 'IsRequired' } };

    spectator = createComponent({ props: { errors: error } });

    expect(spectator.queryAll('.control-error').length).toBe(1);
    expect(spectator.query('.control-error')).toContainText('IsRequired');
  });

  it('should display multiple errors', () => {
    const errors = {
      isRequired: { message: 'IsRequired' },
      mustByEmail: { message: 'Should be valid email' },
    };

    spectator = createComponent({ props: { errors: errors } });

    expect(spectator.queryAll('.control-error').length).toBe(2);
    expect(spectator.queryAll('.control-error')[0]).toContainText('IsRequired');
    expect(spectator.queryAll('.control-error')[1]).toContainText(
      'Should be valid email'
    );
  });

  it('should throw when there is no error', () => {
    expect(() => {
      createComponent();
    }).toThrowError('Form control is empty');
  });

  it('should display defould message when when there is no message', () => {
    const error = { isRequired: {} };

    spectator = createComponent({ props: { errors: control } });

    expect(spectator.queryAll('.control-error').length).toBe(1);
    expect(spectator.query('.control-error')).toContainText(
      'Nieproprawne dane'
    );
  });
});
