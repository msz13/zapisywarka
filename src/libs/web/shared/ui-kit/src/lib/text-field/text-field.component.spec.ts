import { Component } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';

import { TextFieldComponent } from './text-field.component';

@Component({ template: '' })
class CustomHostComponent {
  title = 'Custom HostComponent';
}

describe('TextFieldComponent', () => {
  let host: SpectatorHost<TextFieldComponent, CustomHostComponent>;
  const createHost = createHostFactory({
    component: TextFieldComponent,
    host: CustomHostComponent
  });

  it('should display the host component title', () => {
    host = createHost(`<zippy [title]="title"></zippy>`);
    expect(host.query('.zippy__title')).toHaveText('Custom HostComponent');
  });
});
