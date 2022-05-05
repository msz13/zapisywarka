import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogListComponent } from './catalog-list.component';
import { CatalogModule } from '../catalog.module';
import {
  Spectator,
  createComponentFactory,
  SpyObject,
} from '@ngneat/spectator/jest';
import {
  CatalogService,
  CatalogQuery,
  CatalogStore,
  CatalogItem,
} from '../../../@core/state/catalog/';
import { CoreModule } from '../../../@core/core.module';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NbDialogService, NbDialogModule } from '@nebular/theme';
import { of } from 'rxjs';
import { CATALOG_ITEMS } from '../../../@core/state/catalog/catalog-items-mock';

const mockRouter = jest.fn();

describe('CatalogListComponent', () => {
  let spectator: Spectator<CatalogListComponent>;
  const createComponent = createComponentFactory({
    component: CatalogListComponent,
    imports: [CatalogModule],
    providers: [{ provider: Router, useValue: mockRouter }],
    mocks: [NbDialogService, CatalogService],
    componentMocks: [],
    declareComponent: false,
    detectChanges: false,
  });
  let catalogItemStore: CatalogStore;
  let catalogService: SpyObject<CatalogService>;

  beforeEach(() => {
    spectator = createComponent();
    catalogItemStore = spectator.inject<CatalogStore>(CatalogStore);
    var dialog = spectator.inject<NbDialogService>(NbDialogService);
    catalogService = spectator.inject<CatalogService>(CatalogService);
  });

  it('should exist', () => {
    catalogService.get.mockReturnValue(of(true));
    catalogItemStore.set(CATALOG_ITEMS);
    expect(spectator).toBeDefined();
  });

  it('should set the class name according to the [className] input', () => {});
});
