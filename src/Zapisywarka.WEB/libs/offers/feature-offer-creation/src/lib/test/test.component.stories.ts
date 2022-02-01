import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  NbButtonModule,
  NbCardComponent,
  NbCardModule,
  NbLayoutModule,
  NbThemeModule,
} from '@nebular/theme';
import { TestComponent } from './test.component';

export default {
  title: 'TestComponent',
  component: TestComponent,
};

export const primary = () => ({
  moduleMetadata: {
    imports: [
      NbThemeModule.forRoot({ name: 'default' }),
      NbLayoutModule,
      NbCardModule,
      NbButtonModule,
      RouterTestingModule.withRoutes([]),
      CommonModule,
      FormsModule,
    ],
    declarations: [TestComponent],
  },
  component: TestComponent,
  template: `
  <nb-layout>
  <nb-layout-column style="max-width: 100%">
    <nb-card>
      <nb-card-body>
        <zapisywarka-client-aps-test></zapisywarka-client-aps-test>
        <button >Test</button>
      </nb-card-body>
    </nb-card>
  </nb-layout-column>  
</nb-layout>
  `,
  props: {},
});
