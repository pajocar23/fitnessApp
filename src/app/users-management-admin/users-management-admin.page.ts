import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { regedUserDataRTDB } from '../auth/regedUserDataRTDB.model';

@Component({
  selector: 'app-users-management-admin',
  templateUrl: './users-management-admin.page.html',
  styleUrls: ['./users-management-admin.page.scss'],
})
export class UsersManagementAdminPage implements OnInit {

  regedUsers:regedUserDataRTDB[];

  constructor(public modalController: ModalController,private http:HttpClient,private auth:AuthService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.auth.getAllRegisteredUsersFromRTDB().subscribe(resData=>{
      this.regedUsers=resData;
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      
    });

  }

}
