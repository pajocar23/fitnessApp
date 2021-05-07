import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackersHistoryPage } from './trackers-history.page';

const routes: Routes = [
  {
    path: '',
    component: TrackersHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackersHistoryPageRoutingModule {}
