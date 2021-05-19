import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthyRecepiesPage } from './healthy-recepies.page';

const routes: Routes = [
  {
    path: '',
    component: HealthyRecepiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthyRecepiesPageRoutingModule {}
