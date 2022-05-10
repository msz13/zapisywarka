import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IdentityDomainModule } from '@zapisywarka-client-aps/identity/domain';
import { SharedDomainModule } from '@zapisywarka-client-aps/shared/domain';
import { SharedMaterialModule } from '@zapisywarka.web/material';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';
import { SignUpComponent } from './sign-up.component';

export default {
  title: 'SignUpComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [
      SharedMaterialModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      SharedDomainModule,
    ],
    declarations: [SignUpFormComponent],
  },
  component: SignUpComponent,
  props: {},
});
