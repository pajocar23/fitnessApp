import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaterTrackerPage } from './water-tracker.page';

const routes: Routes = [
  {
    path: '',
    component: WaterTrackerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaterTrackerPageRoutingModule {}
