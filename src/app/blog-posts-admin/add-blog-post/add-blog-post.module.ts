import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBlogPostPageRoutingModule } from './add-blog-post-routing.module';

import { AddBlogPostPage } from './add-blog-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBlogPostPageRoutingModule
  ],
  declarations: [AddBlogPostPage]
})
export class AddBlogPostPageModule {}
