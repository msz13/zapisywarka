import { text, number, boolean, object } from '@storybook/addon-knobs';
import { CatalogItemFormComponent } from './catalog-item-form.component';

export default {
  title: 'CatalogItemFormComponent',
component: CatalogItemFormComponent,};

export const primary = () => ({
  moduleMetadata: {
    imports: [],
  },
  
  props: {
    categories: null,
    catalogItem: null,
  },
});
