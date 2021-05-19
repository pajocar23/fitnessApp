import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.page.html',
  styleUrls: ['./add-blog-post.page.scss'],
})
export class AddBlogPostPage implements OnInit {

  @Input()editingForm;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'editingForm':this.editingForm
    });

  }


}
