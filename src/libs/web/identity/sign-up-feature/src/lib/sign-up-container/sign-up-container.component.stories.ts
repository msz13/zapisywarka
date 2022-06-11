import { CommonModule } from '@angular/common';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { IdentityDomainModule } from '@zapisywarka-client-aps/web-identity-domain';
import { ConfigurationService } from '@zapisywarka-web/web-shared-domain';
import { IdentitySignUpFeatureModule } from '../identity-sign-up-feature.module';
import { SignUpContainerComponent } from './sign-up-container.component';

const mockConfigurationSrv = {
  getConfig: () => {
    return { apiUrl: 'http://localhost' };
  },
} as ConfigurationService;

export default {
  title: 'SignUpContainerComponent',
  component: SignUpContainerComponent,
  decorators: [
    moduleMetadata({
      imports: [IdentitySignUpFeatureModule, IdentityDomainModule],
      providers: [
        { provide: ConfigurationService, useValue: mockConfigurationSrv },
      ],
    })
  ],
} as Meta<SignUpContainerComponent>;

const Template: Story<SignUpContainerComponent> = (args: SignUpContainerComponent) => ({
  component: SignUpContainerComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}