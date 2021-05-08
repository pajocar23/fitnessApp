import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClosestGymsPageRoutingModule } from './closest-gyms-routing.module';

import { ClosestGymsPage } from './closest-gyms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClosestGymsPageRoutingModule
  ],
  declarations: [ClosestGymsPage]
})
export class ClosestGymsPageModule {}
