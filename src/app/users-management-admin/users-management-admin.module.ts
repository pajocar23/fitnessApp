import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersManagementAdminPageRoutingModule } from './users-management-admin-routing.module';

import { UsersManagementAdminPage } from './users-management-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersManagementAdminPageRoutingModule
  ],
  declarations: [UsersManagementAdminPage]
})
export class UsersManagementAdminPageModule {}
