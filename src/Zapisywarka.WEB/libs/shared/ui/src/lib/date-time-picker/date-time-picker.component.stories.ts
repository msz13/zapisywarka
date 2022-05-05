
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from '@zapisywarka.web/material';
import { DateTimePickerComponent } from './date-time-picker.component';

export default {
  title: 'DateTimePickerComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [SharedMaterialModule, BrowserAnimationsModule, MatNativeDateModule]
  },
  component: DateTimePickerComponent,
  props: {
  }
})