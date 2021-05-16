import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaterTrackerPageRoutingModule } from './water-tracker-routing.module';

import { WaterTrackerPage } from './water-tracker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaterTrackerPageRoutingModule
  ],
  declarations: [WaterTrackerPage]
})
export class WaterTrackerPageModule {}
