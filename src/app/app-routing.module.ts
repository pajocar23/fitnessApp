import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/guards/admin.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { TrackerGuard } from './auth/guards/tracker.guard';
import { UserDataGuard } from './auth/guards/user-data.guard';

const routes: Routes = [
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule),
  },
  {
    path: 'user-settings',
    loadChildren: () => import('./user-settings/user-settings.module').then( m => m.UserSettingsPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'trackers-history',
    loadChildren: () => import('./trackers-history/trackers-history.module').then( m => m.TrackersHistoryPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'blog-posts-admin',
    loadChildren: () => import('./blog-posts-admin/blog-posts-admin.module').then( m => m.BlogPostsAdminPageModule),
    canLoad:[AdminGuard]
  },
  {
    path: 'users-management-admin',
    loadChildren: () => import('./users-management-admin/users-management-admin.module').then( m => m.UsersManagementAdminPageModule),
    canLoad:[AdminGuard]
  },
  {
    path: 'user-data',
    loadChildren: () => import('./auth/user-data/user-data.module').then( m => m.UserDataPageModule), 
    canLoad:[UserDataGuard]
  },
  {
    path: 'water-tracker',
    loadChildren: () => import('./trackers/water-tracker/water-tracker.module').then( m => m.WaterTrackerPageModule),
    canActivate:[TrackerGuard]
  },
  {
    path: 'food-tracker',
    loadChildren: () => import('./trackers/food-tracker/food-tracker.module').then( m => m.FoodTrackerPageModule),
    canActivate:[TrackerGuard]
  },
  {
    path: 'sleep-tracker',
    loadChildren: () => import('./trackers/sleep-tracker/sleep-tracker.module').then( m => m.SleepTrackerPageModule),
    canActivate:[TrackerGuard]
  },
  {
    path: 'mood-tracker',
    loadChildren: () => import('./trackers/mood-tracker/mood-tracker.module').then( m => m.MoodTrackerPageModule),
    canActivate:[TrackerGuard]
  },
  {
    path: 'activity-tracker',
    loadChildren: () => import('./trackers/activity-tracker/activity-tracker.module').then( m => m.ActivityTrackerPageModule),
    canActivate:[TrackerGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
