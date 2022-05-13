import { WebIdentityDomainModule } from '@zapisywarka-client-aps/web-identity-domain';
import { SharedMaterialModule } from '@zapisywarka.web/material';
import { WebLandingPageComponent } from './landing-page.component';
import { RouterTestingModule } from '@angular/router/testing';

export default {
  title: 'WebLandingPageComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [
      SharedMaterialModule,
      WebIdentityDomainModule,
      RouterTestingModule,
    ],
  },
  component: WebLandingPageComponent,
  props: {},
});
