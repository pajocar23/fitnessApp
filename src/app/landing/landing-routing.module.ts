import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPage } from './landing.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: LandingPage,
    children:
    [
      {
        path: 'explore',
        loadChildren: () => import('./explore/explore.module').then( m => m.ExplorePageModule)
      },
      {
        path: 'closest-gyms',
        loadChildren: () => import('./closest-gyms/closest-gyms.module').then( m => m.ClosestGymsPageModule)
      },
      {
        path: 'healthy-recepies',
        loadChildren: () => import('./healthy-recepies/healthy-recepies.module').then( m => m.HealthyRecepiesPageModule)
      },
      {
        path:'',
        redirectTo:'/landing/tabs/explore',
        pathMatch: 'full'
      },
    ]
  },
  {
    path:'',
    redirectTo:'/landing/tabs/explore',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
