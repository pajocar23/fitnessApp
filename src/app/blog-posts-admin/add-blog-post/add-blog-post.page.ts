import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
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

  charactersExceededErrorHeading: boolean = false;
  charactersExceededErrorDescription: boolean = false;
  numberOfCharactersOverHeading: number = 0;
  numberOfCharactersOverDescription: number = 0;

  charactersExceededErrorHeadingEdit: boolean = false;
  charactersExceededErrorDescriptionEdit: boolean = false;
  numberOfCharactersOverHeadingEdit: number = 0;
  numberOfCharactersOverDescriptionEdit: number = 0;


  constructor(public modalController: ModalController, public alertController: AlertController, private authServivce: AuthService, private blogPostService: BlogPostService, private loadingController: LoadingController) {
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
      'addingConfirmed': this.addingConfirmed,

      'editingForm': this.editingForm,
      'editingConfirmed': this.editingConfirmed,
      'selectedBlogPostID': this.selectedBlogPostID,
      'selectedBlogPostHeading': this.selectedBlogPostHeading,
      'selectedBlogPostDescription': this.selectedBlogPostDescription,
      'selectedBlogPostImageURL': this.selectedBlogPostImageURL
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
          if (this.selectedBlogPostHeading.length > 20) {
            this.numberOfCharactersOverHeadingEdit = this.selectedBlogPostHeading.length - 20;
            this.charactersExceededErrorHeadingEdit = true;
            this.charactersExceededErrorDescriptionEdit = false;
          } else if (this.selectedBlogPostDescription.length > 160) {
            this.numberOfCharactersOverDescriptionEdit = this.selectedBlogPostDescription.length - 20;
            this.charactersExceededErrorDescriptionEdit = true;
            this.charactersExceededErrorHeadingEdit = false;
          } else {
            this.numberOfCharactersOverHeadingEdit = 0;
            this.numberOfCharactersOverDescriptionEdit = 0;
            this.charactersExceededErrorDescriptionEdit = false;
            this.charactersExceededErrorHeadingEdit = false;
          }

          if (!this.charactersExceededErrorHeadingEdit && !this.charactersExceededErrorDescriptionEdit) {
            console.log("changed");
            this.editingConfirmed = true;
            //ovdeee

            this.loadingController.create({ message: "Updating blog post..." }).then((loadingEl: HTMLIonLoadingElement) => {
              loadingEl.present();
        
              this.dismiss();
              loadingEl.dismiss();
            })
          } else {
            this.editingConfirmed = false;
            console.log("not changed");
          }

        }
      },
      {
        text: "No",
        handler: () => {
          console.log("not changed");
          this.editingConfirmed = true;
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
          if (this.addedBlogPostHeading.length > 20) {
            this.numberOfCharactersOverHeading = this.addedBlogPostHeading.length - 20;
            this.charactersExceededErrorHeading = true;
            this.charactersExceededErrorDescription = false;
          } else if (this.addedBlogPostDescription.length > 160) {
            this.numberOfCharactersOverDescription = this.addedBlogPostDescription.length - 20;
            this.charactersExceededErrorDescription = true;
            this.charactersExceededErrorHeading = false;
          } else {
            this.numberOfCharactersOverHeading = 0;
            this.numberOfCharactersOverDescription = 0;
            this.charactersExceededErrorDescription = false;
            this.charactersExceededErrorHeading = false;
          }

          if (!this.charactersExceededErrorHeading && !this.charactersExceededErrorDescription) {
            this.addingConfirmed = true;
            console.log("added");
            this.loadingController.create({ message: "Adding blog post..." }).then((loadingEl: HTMLIonLoadingElement) => {
              loadingEl.present();
        
              this.dismiss();
              loadingEl.dismiss();
            })
          } else {
            this.addingConfirmed = false;
            console.log("not added");
          }

        }
      },
      {
        text: "No",
        handler: () => {
          this.addingConfirmed = false;
          console.log("not added");
        }
      }
      ]
    });

    await alert.present();
  }

}

