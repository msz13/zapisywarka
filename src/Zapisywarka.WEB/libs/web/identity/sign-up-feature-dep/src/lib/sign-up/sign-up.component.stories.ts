import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebSharedDomainModule } from '@zapisywarka-web/web-shared-domain';
import { WebSharedMaterialModule } from '@zapisywarka-web/web-shared-material';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';
import { SignUpComponent } from './sign-up.component';

export default {
  title: 'SignUpComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [
      WebSharedMaterialModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      WebSharedDomainModule,
    ],
    declarations: [SignUpFormComponent],
  },
  component: SignUpComponent,
  props: {},
});
