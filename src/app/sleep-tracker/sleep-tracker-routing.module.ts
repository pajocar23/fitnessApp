import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SleepTrackerPage } from './sleep-tracker.page';

const routes: Routes = [
  {
    path: '',
    component: SleepTrackerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SleepTrackerPageRoutingModule {}
