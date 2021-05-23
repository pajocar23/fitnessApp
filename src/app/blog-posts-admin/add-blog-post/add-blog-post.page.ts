import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.page.html',
  styleUrls: ['./add-blog-post.page.scss'],
})
export class AddBlogPostPage implements OnInit {

  @Input()editingForm;

  @Input()selectedBlogPostID;
  @Input()selectedBlogPostHeading;
  @Input()selectedBlogPostDescription;
  @Input()selectedBlogPostImageURL;
  viewImageWithLink;

  constructor(public modalController: ModalController,public alertController: AlertController) { 
    this.viewImageWithLink=this.selectedBlogPostImageURL;
  }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'editingForm':this.editingForm
    });

  }

  async presentAlertEdit() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warning',
      message: 'Are you sure you want to change this blog-post ?',
      buttons: [{
        text:"Yes",
        handler: ()=>{
          console.log("changed")
        }
      },
      {
        text:"No",
        handler: ()=>{
          console.log("not changed")
      }
    }
    ]
    });

    await alert.present();
  }

  presentPicture(value:string){
    this.viewImageWithLink=this.selectedBlogPostImageURL;
  }

  async presentAlertAdd() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warning',
      message: 'Are you sure you want to add this blog-post ?',
      buttons: [{
        text:"Yes",
        handler: ()=>{
          console.log("added")
        }
      },
      {
        text:"No",
        handler: ()=>{
          console.log("not added")
      }
    }
    ]
    });

    await alert.present();
  }


}
