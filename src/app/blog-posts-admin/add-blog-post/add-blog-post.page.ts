import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { BlogPostService } from '../services/blog-post.service';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.page.html',
  styleUrls: ['./add-blog-post.page.scss'],
})
export class AddBlogPostPage implements OnInit {

  @Input() editingForm;

  @Input() selectedBlogPostID;
  @Input() selectedBlogPostHeading;
  @Input() selectedBlogPostDescription;
  @Input() selectedBlogPostImageURL;

  @Input() addedBlogPostHeading;
  @Input() addedBlogPostDescription;
  @Input() addedBlogPostImageUrl;
  //@Input()blogPosts:BlogPost[];

  viewImageWithLinkEdit;
  viewImageWithLinkAdd;

  @Input() addingConfirmed;
  @Input() editingConfirmed;

  constructor(public modalController: ModalController, public alertController: AlertController, private authServivce: AuthService, private blogPostService: BlogPostService) {
    this.viewImageWithLinkEdit = this.selectedBlogPostImageURL;

    this.viewImageWithLinkAdd = this.addedBlogPostImageUrl;
  }

  ngOnInit() {
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'addedBlogPostHeading': this.addedBlogPostHeading,
      'addedBlogPostDescription': this.addedBlogPostDescription,
      'addedBlogPostImageUrl': this.addedBlogPostImageUrl,
      'addingConfirmed':this.addingConfirmed,

      'editingForm': this.editingForm,
      'editingConfirmed':this.editingConfirmed,
      'selectedBlogPostID':this.selectedBlogPostID,
      'selectedBlogPostHeading':this.selectedBlogPostHeading,
      'selectedBlogPostDescription':this.selectedBlogPostDescription,
      'selectedBlogPostImageURL':this.selectedBlogPostImageURL
    });

  }

  async presentAlertEdit() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warning',
      message: 'Are you sure you want to change this blog-post ?',
      buttons: [{
        text: "Yes",
        handler: () => {
          console.log("changed");
          this.editingConfirmed=true;
          this.dismiss();
        }
      },
      {
        text: "No",
        handler: () => {
          console.log("not changed");
          this.editingConfirmed=true;
        }
      }
      ]
    });

    await alert.present();
  }

  presentPictureEdit(value: string) {
    this.viewImageWithLinkEdit = value;
  }

  presentPictureAdd(value: string) {
    this.viewImageWithLinkAdd = value;
  }

  async presentAlertAdd() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warning',
      message: 'Are you sure you want to add this blog-post ?',
      buttons: [{
        text: "Yes",
        handler: () => {
          this.addingConfirmed=true;
          console.log("added");
          this.dismiss();
        }
      },
      {
        text: "No",
        handler: () => {
          this.addingConfirmed=true;
          console.log("not added");
        }
      }
      ]
    });

    await alert.present();
  }

}

