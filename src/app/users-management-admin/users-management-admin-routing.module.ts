import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersManagementAdminPage } from './users-management-admin.page';

const routes: Routes = [
  {
    path: '',
    component: UsersManagementAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersManagementAdminPageRoutingModule {}
