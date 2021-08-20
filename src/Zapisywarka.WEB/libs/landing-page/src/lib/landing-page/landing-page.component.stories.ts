
import { SharedMaterialModule } from '@zapisywarka.web/material';
import { LandingPageComponent } from './landing-page.component';

export default {
  title: 'LandingPageComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [SharedMaterialModule]
  },
  component: LandingPageComponent,
  props: {
  }
})