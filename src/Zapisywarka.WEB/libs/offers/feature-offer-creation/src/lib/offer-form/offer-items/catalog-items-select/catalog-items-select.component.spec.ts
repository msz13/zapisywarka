import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogItemsSelectComponent } from './catalog-items-select.component';

describe('CatalogItemsSelecComponent', () => {
  describe('compareTo', () => {
    it('when_catalog_items_equal_should return true', () => {
      const item1 = {
        id: 1,
        name: 'Bochenek tradycyjny',
        categoryId: 1,
        price: 9,
        avaibleQuantity: 60,
      };

      const item2 = {
        id: 1,
        name: 'Foremkowy z żurawiną',
        categoryId: 2,
        price: 6,
        avaibleQuantity: 40,
      };

      var component = new CatalogItemsSelectComponent();

      expect(component.compareById(item1, item2)).toBe(true);
    });

    it('when_catalog_items_not_equal_should return true', () => {
      const item1 = {
        id: 1,
        name: 'Bochenek tradycyjny',
        categoryId: 1,
        price: 9,
        avaibleQuantity: 60,
      };

      const item2 = {
        id: 2,
        name: 'Foremkowy z żurawiną',
        categoryId: 2,
        price: 6,
        avaibleQuantity: 40,
      };

      var component = new CatalogItemsSelectComponent();

      expect(component.compareById(item1, item2)).toBe(false);
    });
  });
});
