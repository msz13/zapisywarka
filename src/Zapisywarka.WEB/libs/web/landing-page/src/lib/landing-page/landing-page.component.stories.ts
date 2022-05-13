import { WebIdentityDomainModule } from '@zapisywarka-client-aps/web-identity-domain';
import { WebSharedMaterialModule } from '@zapisywarka-web/web-shared-material';
import { WebLandingPageComponent } from './landing-page.component';
import { RouterTestingModule } from '@angular/router/testing';

export default {
  title: 'WebLandingPageComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [
      WebSharedMaterialModule,
      WebIdentityDomainModule,
      RouterTestingModule,
    ],
  },
  component: WebLandingPageComponent,
  props: {},
});
