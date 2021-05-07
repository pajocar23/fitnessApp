import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'user-data',
    loadChildren: () => import('./user-data/user-data.module').then( m => m.UserDataPageModule)
  },
  {
    path: 'user-settings',
    loadChildren: () => import('./user-settings/user-settings.module').then( m => m.UserSettingsPageModule)
  },
  {
    path: 'trackers-history',
    loadChildren: () => import('./trackers-history/trackers-history.module').then( m => m.TrackersHistoryPageModule)
  },
  {
    path: 'closest-gyms',
    loadChildren: () => import('./closest-gyms/closest-gyms.module').then( m => m.ClosestGymsPageModule)
  },
  {
    path: 'blog-posts-admin',
    loadChildren: () => import('./blog-posts-admin/blog-posts-admin.module').then( m => m.BlogPostsAdminPageModule)
  },
  {
    path: 'users-management-admin',
    loadChildren: () => import('./users-management-admin/users-management-admin.module').then( m => m.UsersManagementAdminPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
