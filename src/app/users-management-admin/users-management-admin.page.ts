import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-users-management-admin',
  templateUrl: './users-management-admin.page.html',
  styleUrls: ['./users-management-admin.page.scss'],
})
export class UsersManagementAdminPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      
    });

  }

}
