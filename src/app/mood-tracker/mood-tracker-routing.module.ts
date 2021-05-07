import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoodTrackerPage } from './mood-tracker.page';

const routes: Routes = [
  {
    path: '',
    component: MoodTrackerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoodTrackerPageRoutingModule {}
