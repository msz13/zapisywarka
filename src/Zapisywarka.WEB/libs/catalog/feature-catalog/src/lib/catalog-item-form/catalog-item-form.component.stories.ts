import { text, number, boolean, object } from '@storybook/addon-knobs';
import { CatalogItemFormComponent } from './catalog-item-form.component';

export default {
  title: 'CatalogItemFormComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: CatalogItemFormComponent,
  props: {
    categories: null,
    catalogItem: null
  }
})