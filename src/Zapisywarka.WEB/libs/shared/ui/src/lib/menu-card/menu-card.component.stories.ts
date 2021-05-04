
import { object, text } from '@storybook/addon-knobs';
import { SharedMaterialModule } from '@zapisywarka.web/material';
import { MenuCardComponent } from './menu-card.component';

export default {
  title: 'MenuCardComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [SharedMaterialModule]
  },
  component: MenuCardComponent,
  props: {
    title: text('menuItem', 'Katalog' )
  }
})