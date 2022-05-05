import { Pipe, PipeTransform } from '@angular/core';
import { CatalogItem, Category } from './catalog-items-select.component';


@Pipe({
  name: 'catalogItemsCategoryFilter'
})
export class CatalogItemsSelectPipe implements PipeTransform {

  transform(catalogItems: CatalogItem[], category: Category): unknown {
    return catalogItems.filter(item => item.categoryId == category.id);
  }

}

