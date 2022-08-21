import { createComponentFactory, Spectator } from '@ngneat/spectator/jest'
import {SpectacularAppComponent, SpectacularFeatureRouter, SpectacularFeatureTestingModule } from '@ngworker/spectacular'
import {SpectacularSpikeModule } from './spectacular-spike.module'
import {Location} from '@angular/common'
import { fakeAsync } from '@angular/core/testing'


describe('Spectacular spike', () => {
  let spectator: Spectator<SpectacularAppComponent>;
  const createComponent = createComponentFactory({
    component: SpectacularAppComponent,
    imports: [SpectacularFeatureTestingModule.withFeature({
        featureModule: SpectacularSpikeModule,
        featurePath: 'spike'
    })]
  });
  let router: SpectacularFeatureRouter

  beforeEach(() => {
    spectator = createComponent()
    router = spectator.inject(SpectacularFeatureRouter)
  });

  it('should have a success class by default', () => {
    expect(spectator.fixture).toExist();    
  });

  it('should navigate properly',  async ()=>{
    await router.navigate(['spike'])
    expect(spectator.inject(Location).path()).toBe("/spike")

    spectator.click('.link-2')
    spectator.fixture.whenStable()

    
    //await router.navigate(['spike', 'test'])
  
    expect(spectator.inject(Location).path()).toBe("/spike/test")
    
  })

 
});