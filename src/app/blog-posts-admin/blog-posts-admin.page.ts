import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BlogPost } from '../landing/explore/blog-post.model';
import { AddBlogPostPage } from './add-blog-post/add-blog-post.page';

@Component({
  selector: 'app-blog-posts-admin',
  templateUrl: './blog-posts-admin.page.html',
  styleUrls: ['./blog-posts-admin.page.scss'],
})
export class BlogPostsAdminPage implements OnInit {

  blogPosts: BlogPost[] = [{ id: '1', heading: 'water fact', description: 'water makes 69% of human body', imageUrl: 'https://media3.s-nbcnews.com/i/newscms/2017_15/1206634/woman-drinking-water-tease-today-170410_bb7df024651d415ac135bfaf31c4f819.jpg' },
  { id: '2', heading: 'food fact', description: 'without food you dead BOi', imageUrl: 'https://i.pinimg.com/originals/a8/cd/aa/a8cdaa791eef42e15067426d08a566b0.jpg' },
  { id: '3', heading: 'sleep fact', description: 'If you watch monitor that emmits blue light before going to sleep, your endorphine poroduction is decreased and therefore you cant sleep well', imageUrl: 'https://media.gq.com/photos/5e617d866ad6c200080c3f7d/16:9/w_1839,h_1034,c_limit/gq%20march%202020%20Is%20my%20screen-based%20lifestyle%20ruining%20my%20vision?%20.jpg' }]

  editingForm=false;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async presentAddingModal() {
    const modal = await this.modalController.create({
      component: AddBlogPostPage,
      componentProps: {
        'editingForm':this.editingForm,
      }
    });
    modal.present();

    return modal.onDidDismiss().then(
      (data: any) => {
        if(data){
          this.editingForm=data.data.editingForm;
        }
      })
  }

  EditForm(){
    this.editingForm=true;
  }

  AddForm(){
    this.editingForm=false;
  }


}
