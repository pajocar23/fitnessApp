import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBlogPostPage } from './add-blog-post.page';

const routes: Routes = [
  {
    path: '',
    component: AddBlogPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBlogPostPageRoutingModule {}
