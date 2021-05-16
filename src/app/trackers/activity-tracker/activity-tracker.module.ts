import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityTrackerPageRoutingModule } from './activity-tracker-routing.module';

import { ActivityTrackerPage } from './activity-tracker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityTrackerPageRoutingModule
  ],
  declarations: [ActivityTrackerPage]
})
export class ActivityTrackerPageModule {}
