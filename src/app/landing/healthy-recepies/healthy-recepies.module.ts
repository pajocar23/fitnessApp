import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthyRecepiesPageRoutingModule } from './healthy-recepies-routing.module';

import { HealthyRecepiesPage } from './healthy-recepies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthyRecepiesPageRoutingModule
  ],
  declarations: [HealthyRecepiesPage]
})
export class HealthyRecepiesPageModule {}
