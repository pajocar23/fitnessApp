import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogPostsAdminPage } from './blog-posts-admin.page';

const routes: Routes = [
  {
    path: '',
    component: BlogPostsAdminPage
  },
  {
    path: 'add-blog-post',
    loadChildren: () => import('./add-blog-post/add-blog-post.module').then( m => m.AddBlogPostPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogPostsAdminPageRoutingModule {}
