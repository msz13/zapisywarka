import { IdentityDomainModule } from '@zapisywarka-client-aps/identity/domain';
import { SharedMaterialModule } from '@zapisywarka.web/material';
import { LandingPageComponent } from './landing-page.component';
import { RouterTestingModule } from '@angular/router/testing';

export default {
  title: 'LandingPageComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [
      SharedMaterialModule,
      IdentityDomainModule,
      RouterTestingModule,
    ],
  },
  component: LandingPageComponent,
  props: {},
});
