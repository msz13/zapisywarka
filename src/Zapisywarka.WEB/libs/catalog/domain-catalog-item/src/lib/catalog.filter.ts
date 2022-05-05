import {
  Id,
  CatalogCategory,
} from '@zapisywarka-client-aps/catalog/domain-category';
import { CatalogItem } from './catalog.model';

export interface CatalogFilterData {
  category?: Id;
  name?: string;
}

export class CatalogFilter {
  static fromFilterData(data?: CatalogFilterData) {
    const filteres = [];

    if (data.category) filteres.push(categoryFilter(data.category));

    if (data.name) filteres.push(nameFilter(data.name));

    switch (true) {
      case filteres.length == 0:
        return defoultFilter;

      case filteres.length == 1:
        return filteres[0];

      case filteres.length > 1:
        return executeFilters(filteres);
    }
  }
}

const defoultFilter = (item: CatalogItem) => true;

const categoryFilter = (categoryId: Id) => (item: CatalogItem) =>
  item.categoryId == categoryId;

const nameFilter = (name: string) => (item: CatalogItem) =>
  item.name.toLocaleLowerCase().includes(name);

const executeFilters =
  (filteres: any[]) =>
  (item: CatalogItem): boolean => {
    const result = filteres.reduce((result, filter) => {
      return result ? filter(item) : result;
    }, true);
    return result;
  };
