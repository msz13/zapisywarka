import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOfferComponent } from './new-offer.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import {NewOfferModule} from './new-offer.module'
import { CatalogCategoryService, CatalogCategoryQuery } from 'app/@core/state/catalog-category';
import { CatalogService, CatalogQuery } from 'app/@core/state/catalog';
import { ThemeModule } from 'app/@theme/theme.module';
import { NbNativeDateService, NbDateService } from '@nebular/theme';

describe('NewOfferComponent', () => {
  let spectator: Spectator<NewOfferComponent>;
  const createComponent = createComponentFactory({
    component: NewOfferComponent,
    imports: [NewOfferModule, ThemeModule],
    providers: [CatalogCategoryQuery, CatalogService, CatalogQuery, NbDateService],
    declareComponent: false
  });

  beforeEach(() => spectator = createComponent());

  it('should create component', ()=>{
    expect(spectator.component).toBeDefined()
  })

  
});
