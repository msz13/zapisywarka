type categoryId = number;

export interface CatalogItem {
  id: number;
  name: string;
  categoryId: categoryId;
  price: number;
  avaibleQuantity: number;
}

export interface NewCatalogItem {
  name: string;
  categoryId: categoryId;
  price: number;
  avaibleQuantity: number;
}

export interface CatalogItemView {
  id: number;
  name: string;
  category: string;
  price: number;
  avaibleQuantity: number;
}

export interface CatalogItemsGroupedByCategoryVM {
  [category: string]: Pick<CatalogItem, 'id' | 'name'>[];
}
