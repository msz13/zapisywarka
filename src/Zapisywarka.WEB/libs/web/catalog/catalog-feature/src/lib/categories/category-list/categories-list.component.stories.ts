import { object } from '@storybook/addon-knobs';
import { CategoriesListComponent } from './categories-list.component';
import { CATALOG_CATEGORIES } from '@zapisywarka-web/web-catalog-utills-testing';

export default {
  title: 'CategoriesListComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [],
  },
  component: CategoriesListComponent,
  props: {
    categories: object('categories', CATALOG_CATEGORIES),
  },
});
