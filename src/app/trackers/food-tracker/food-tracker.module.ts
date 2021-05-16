import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodTrackerPageRoutingModule } from './food-tracker-routing.module';

import { FoodTrackerPage } from './food-tracker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodTrackerPageRoutingModule
  ],
  declarations: [FoodTrackerPage]
})
export class FoodTrackerPageModule {}
