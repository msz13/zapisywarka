
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from '@zapisywarka.web/material';
import { SignUpComponent } from './sign-up.component';

export default {
  title: 'SignUpComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [SharedMaterialModule, BrowserAnimationsModule]
  },
  component: SignUpComponent,
  props: {
  }
})