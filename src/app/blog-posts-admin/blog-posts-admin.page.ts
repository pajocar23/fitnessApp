import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { BlogPost } from './blog-post.model';
import { AddBlogPostPage } from './add-blog-post/add-blog-post.page';
import { AuthService } from '../auth/auth.service';
import { BlogPostService } from './services/blog-post.service';

@Component({
  selector: 'app-blog-posts-admin',
  templateUrl: './blog-posts-admin.page.html',
  styleUrls: ['./blog-posts-admin.page.scss'],
})
export class BlogPostsAdminPage implements OnInit {

  blogPosts: BlogPost[] =[];

  editingForm = false;

  selectedBlogPostID;
  selectedBlogPostHeading;
  selectedBlogPostDescription;
  selectedBlogPostImageURL;

  addedBlogPostHeading: string;
  addedBlogPostDescription: string;
  addedBlogPostImageUrl: string;

  idDeleteImage:string;

  addingConfirmed:boolean=false;
  editingConfirmed:boolean=false;

  constructor(public modalController: ModalController, public alertController: AlertController, private authServivce: AuthService, private blogPostService: BlogPostService,private loadingController: LoadingController) { }

  ngOnInit() {
    this.blogPostService.blogPosts.subscribe(resData=>{
      this.blogPosts=resData;
    });
  }

  ionViewWillEnter() {
    
  }

  async presentAddingModal() { 
    const modal = await this.modalController.create({
      component: AddBlogPostPage,
      componentProps: {
        'addedBlogPostHeading': this.addedBlogPostHeading,
        'addedBlogPostDescription': this.addedBlogPostDescription,
        'addedBlogPostImageUrl': this.addedBlogPostImageUrl,
        'addingConfirmed':this.addingConfirmed
        //'blogPosts':this.blogPosts
      }
    });

    modal.present();
    return modal.onDidDismiss().then(
      (data: any) => {
        if (data) {
          this.editingForm = data.data.editingForm;
          //this.blogPosts=data.data.blogPosts;
          this.addedBlogPostHeading=data.data.addedBlogPostHeading;
          this.addedBlogPostDescription=data.data.addedBlogPostDescription;
          this.addedBlogPostImageUrl=data.data.addedBlogPostImageUrl;
          this.addingConfirmed=data.data.addingConfirmed;

          if(this.addingConfirmed==true){
            this.addingConfirmed=false;
            this.blogPostService.addBlogPost(this.addedBlogPostHeading,this.addedBlogPostDescription,this.addedBlogPostImageUrl,this.authServivce.logedUserID).subscribe(resData=>{
              //this.blogPosts=resData;
            });
          }

        }
      })
  }

  async presentEditingModal() { 
    const modal = await this.modalController.create({
      component: AddBlogPostPage,
      componentProps: {      
        'editingForm': this.editingForm,
        'selectedBlogPostID': this.selectedBlogPostID,
        'selectedBlogPostHeading': this.selectedBlogPostHeading,
        'selectedBlogPostDescription': this.selectedBlogPostDescription,
        'selectedBlogPostImageURL': this.selectedBlogPostImageURL,
        'editingConfirmed':this.editingConfirmed
      }
    });
    modal.present();

    return modal.onDidDismiss().then(
      (data: any) => {
        if (data) {
          this.editingForm = data.data.editingForm;
          this.editingConfirmed=data.data.editingConfirmed;
          this.selectedBlogPostID=data.data.selectedBlogPostID;
          this.selectedBlogPostHeading=data.data.selectedBlogPostHeading;
          this.selectedBlogPostDescription=data.data.selectedBlogPostDescription;
          this.selectedBlogPostImageURL=data.data.selectedBlogPostImageURL;

          if(this.editingConfirmed==true){
            this.editingConfirmed=false;
            this.blogPostService.editBlogPost(this.selectedBlogPostID, this.selectedBlogPostHeading,this.selectedBlogPostDescription,this.selectedBlogPostImageURL,this.authServivce.logedUserID).subscribe(resData=>{
              console.log("Editovano");
            });
          }
        }
      })
  }

  EditForm(blogPost: BlogPost) {
    this.editingForm = true;
    this.selectedBlogPostID = blogPost.id;
    this.selectedBlogPostHeading = blogPost.heading;
    this.selectedBlogPostDescription = blogPost.description;
    this.selectedBlogPostImageURL = blogPost.imageUrl;
  }

  DeleteBlogPost(blogPost: BlogPost){
    this.idDeleteImage = blogPost.id;
  }

  AddForm() {
    this.editingForm = false;
  }

  async presentAlertDelete() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warning',
      message: 'Are you sure you want to delete this blog-post ?',
      buttons: [{
        text: "Yes",
        handler: () => {
          this.loadingController.create({ message: "Deleting blog post..." }).then((loadingEl: HTMLIonLoadingElement) => {
            loadingEl.present();
            this.blogPostService.deleteBlogPost(this.idDeleteImage).subscribe(resData=>{
            });
            loadingEl.dismiss();
            console.log("deleted");
          })
        }
      },
      {
        text: "No",
        handler: () => {
          console.log("not deleted");
        }
      }
      ]
    });

    await alert.present();
  }

  getAllBlogPostsFromDB(){
    this.blogPostService.getAllBlogPosts().subscribe(resData=>{
      //this.blogPosts=resData;
    });
  }



}
