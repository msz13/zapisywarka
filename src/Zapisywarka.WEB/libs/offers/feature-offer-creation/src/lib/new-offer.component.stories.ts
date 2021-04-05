import {ThemeModule} from '@zapisywarka-client-aps/shared/theme'
import { NewOfferComponent } from './new-offer.component';

export default {
  title: 'NewOfferComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [ThemeModule.forRoot()]
  },
  component: NewOfferComponent,
  props: {
  }
})