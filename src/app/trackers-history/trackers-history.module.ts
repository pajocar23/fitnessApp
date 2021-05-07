import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackersHistoryPageRoutingModule } from './trackers-history-routing.module';

import { TrackersHistoryPage } from './trackers-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackersHistoryPageRoutingModule
  ],
  declarations: [TrackersHistoryPage]
})
export class TrackersHistoryPageModule {}
