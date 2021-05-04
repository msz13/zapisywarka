
import { SharedMaterialModule } from '@zapisywarka.web/material';
import { MainMenuComponent } from './main-menu.component';

export default {
  title: 'MainMenuComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [SharedMaterialModule]
  },
  component: MainMenuComponent,
  props: {
  }
})