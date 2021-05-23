import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { BlogPost } from '../landing/explore/blog-post.model';
import { AddBlogPostPage } from './add-blog-post/add-blog-post.page';

@Component({
  selector: 'app-blog-posts-admin',
  templateUrl: './blog-posts-admin.page.html',
  styleUrls: ['./blog-posts-admin.page.scss'],
})
export class BlogPostsAdminPage implements OnInit {

  blogPosts: BlogPost[] = [{ id: '1', heading: 'water fact', description: 'water makes 80% of human body', imageUrl: 'https://media3.s-nbcnews.com/i/newscms/2017_15/1206634/woman-drinking-water-tease-today-170410_bb7df024651d415ac135bfaf31c4f819.jpg' },
  { id: '2', heading: 'food fact', description: 'without food you are going to die', imageUrl: 'https://i.pinimg.com/originals/a8/cd/aa/a8cdaa791eef42e15067426d08a566b0.jpg' },
  { id: '3', heading: 'sleep fact', description: 'If you watch monitor that emmits blue light before going to sleep, your endorphine poroduction is decreased and therefore you cant sleep well', imageUrl: 'https://media.gq.com/photos/5e617d866ad6c200080c3f7d/16:9/w_1839,h_1034,c_limit/gq%20march%202020%20Is%20my%20screen-based%20lifestyle%20ruining%20my%20vision?%20.jpg' }]

  editingForm=false;

  selectedBlogPostID;
  selectedBlogPostHeading;
  selectedBlogPostDescription;
  selectedBlogPostImageURL;

  constructor(public modalController: ModalController,public alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAddingModal() {
    const modal = await this.modalController.create({
      component: AddBlogPostPage,
      componentProps: {
        'editingForm':this.editingForm,
        'selectedBlogPostID':this.selectedBlogPostID,
        'selectedBlogPostHeading':this.selectedBlogPostHeading,
        'selectedBlogPostDescription':this.selectedBlogPostDescription,
        'selectedBlogPostImageURL':this.selectedBlogPostImageURL
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

  EditForm(blogPost:BlogPost){
    this.editingForm=true;
    this.selectedBlogPostID=blogPost.id;
    this.selectedBlogPostHeading=blogPost.heading;
    this.selectedBlogPostDescription=blogPost.description;
    this.selectedBlogPostImageURL=blogPost.imageUrl;
  }

  AddForm(){
    this.editingForm=false;
  }

  async presentAlertDelete() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warning',
      message: 'Are you sure you want to delete this blog-post ?',
      buttons: [{
        text:"Yes",
        handler: ()=>{
          console.log("deleted")
        }
      },
      {
        text:"No",
        handler: ()=>{
          console.log("not deleted")
      }
    }
    ]
    });

    await alert.present();
  }



}
