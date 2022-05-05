
import { text } from '@storybook/addon-knobs';
import { InitialAvatarComponent } from '../initial-avatar/initial-avatar.component';
import { SideNavAccountInfoComponent } from './side-nav-account-info.component';

export default {
  title: 'SideNavAccountInfoComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [],
    declarations: [InitialAvatarComponent]
  },
  component: SideNavAccountInfoComponent,
  props: {
    accauntName: text('accauntName', 'Bochenek')
  }
})