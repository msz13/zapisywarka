import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { Test2Component, TestAppComponent, TestComponent } from './test.component';
import { TestResolver } from './test.resolver';



@NgModule({
  imports: [CommonModule, RouterModule.forChild(
    [
      {
        path: '',
        component: TestAppComponent,
        children: [
          {
            path: '',
            component: TestComponent
          },
          {
            path: 'test',
            component: Test2Component,
            resolve: {
              test: TestResolver
            }
          },
                   
        ]

      }]
  )],
  declarations: [TestAppComponent, TestComponent, Test2Component]   
  })
export class SpectacularSpikeModule { }
