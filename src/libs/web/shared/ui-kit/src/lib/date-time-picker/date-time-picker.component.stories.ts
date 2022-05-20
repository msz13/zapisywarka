import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebSharedMaterialModule } from '@zapisywarka-web/web-shared-material';
import { DateTimePickerComponent } from './date-time-picker.component';

export default {
  title: 'DateTimePickerComponent',
component: DateTimePickerComponent,};

export const primary = () => ({
  moduleMetadata: {
    imports: [
      WebSharedMaterialModule,
      BrowserAnimationsModule,
      MatNativeDateModule,
    ],
  },
  
  props: {},
});
