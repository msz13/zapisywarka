import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { iif, Observable } from 'rxjs';
import { CatalogItem, CatalogService, CatalogQuery } from '@zapisywarka-client-aps/catalog/domain-catalog-item'
import { CatalogCategory, CatalogCategoryQuery } from '@zapisywarka-client-aps/catalog/domain-category'

@Component({
  selector: 'update-catalog-tem',
  templateUrl: './update-catalog-tem.component.html',
  styleUrls: ['./update-catalog-tem.component.scss']
})
export class UpdateCatalogTemComponent implements OnInit {
  
  $categories: Observable<CatalogCategory[]>   
  catalogItem: CatalogItem;
  $isLoading: Observable<boolean>

  constructor(
    private categoryQuery: CatalogCategoryQuery,
    private catalogItemService: CatalogService,
    private catalogItemQuery: CatalogQuery,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.paramMap.pipe(switchMap((params: ParamMap) => iif(() => params.has('id'),
      this.catalogItemQuery.selectEntity(params.get('id'))
      )))
    .subscribe(item => {
       this.catalogItem = item     
      }
    ) 
    this.$categories = this.categoryQuery.selectAll()

    this.$isLoading = this.catalogItemQuery.selectLoading()
  }

  onCencel(){
    this.router.navigate(['../'],{relativeTo: this.route})
  }

  onSubmit(item: CatalogItem) {
    this.catalogItemService.update(this.catalogItem.id, item)
      .subscribe(()=> {
        this.router.navigate(['../'],{relativeTo: this.route})
      })

   
    
  }
 

}
