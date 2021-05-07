import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlogPostsAdminPageRoutingModule } from './blog-posts-admin-routing.module';

import { BlogPostsAdminPage } from './blog-posts-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlogPostsAdminPageRoutingModule
  ],
  declarations: [BlogPostsAdminPage]
})
export class BlogPostsAdminPageModule {}
