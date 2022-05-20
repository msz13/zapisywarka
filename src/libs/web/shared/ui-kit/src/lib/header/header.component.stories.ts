import { text, number, boolean } from '@storybook/addon-knobs';
import { HeaderComponent } from './header.component';
import { WebSharedMaterialModule } from '@zapisywarka-web/web-shared-material';
import { action } from '@storybook/addon-actions';

export default {
  title: 'HeaderComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [WebSharedMaterialModule],
    declarations: [HeaderComponent],
  },
  component: HeaderComponent,
  template:
    '<app-header [userName]="userName" (toggleMenu)="onToggleMenu()"></app-header>',
  props: {
    userName: text('userName', 'Bochenek'),
    onToggleMenu: action('onToggleMenu'),
  },
});
