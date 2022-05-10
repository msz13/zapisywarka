import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import {
  ConfigurationService,
  SharedDomainModule,
} from '@zapisywarka-client-aps/shared/domain';
import { SharedMaterialModule } from '@zapisywarka.web/material';
import { IdentityLoginFeatureModule } from '..';
import { LoginContainerComponent } from './login-container.component';
import { LoginComponent } from './login/login.component';

const mockConfigurationSrv = {
  getConfig: () => {
    return { apiUrl: 'http://localhost:4400' };
  },
} as ConfigurationService;

export default {
  title: 'LoginContainerComponent',
  decorators: [
    moduleMetadata({
      imports: [
        IdentityLoginFeatureModule,
        BrowserAnimationsModule,
        RouterModule,
      ],
      providers: [
        { provide: ConfigurationService, useValue: mockConfigurationSrv },
      ],
    }),
  ],
} as Meta<LoginContainerComponent>;

const Template: Story<LoginContainerComponent> = (
  args: LoginContainerComponent
) => ({
  component: LoginContainerComponent,
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
