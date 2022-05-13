import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ConfigurationService } from '@zapisywarka-web/web-shared-domain';
import { WebIdentityLoginFeatureModule } from '..';
import { LoginContainerComponent } from './login-container.component';

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
        WebIdentityLoginFeatureModule,
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
