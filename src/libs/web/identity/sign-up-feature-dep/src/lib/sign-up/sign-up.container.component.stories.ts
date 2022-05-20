import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '@zapisywarka-client-aps/web-identity-domain';
import { IdentitySignUpFeatureModule } from '../identity-sign-up-feature.module';
import { SignUpContainerComponent } from './sign-up.container.component';

export default {
  title: 'SignUpContainerComponent',
component: SignUpContainerComponent,};

export const primary = () => ({
  moduleMetadata: {
    imports: [
      HttpClientModule,
      IdentitySignUpFeatureModule,
      BrowserAnimationsModule,
    ],
    providers: [UserService],
  },
  
  props: {},
});
