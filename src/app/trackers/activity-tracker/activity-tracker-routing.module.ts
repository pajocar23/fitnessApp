import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityTrackerPage } from './activity-tracker.page';

const routes: Routes = [
  {
    path: '',
    component: ActivityTrackerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityTrackerPageRoutingModule {}
