import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SleepTrackerPageRoutingModule } from './sleep-tracker-routing.module';

import { SleepTrackerPage } from './sleep-tracker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SleepTrackerPageRoutingModule
  ],
  declarations: [SleepTrackerPage]
})
export class SleepTrackerPageModule {}
