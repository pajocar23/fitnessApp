import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { BulkComponent } from './bulk/bulk.component';
import { LeanBulkComponent } from './lean-bulk/lean-bulk.component';
import { LoseWeightComponent } from './lose-weight/lose-weight.component';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.page.html',
  styleUrls: ['./user-data.page.scss'],
})
export class UserDataPage implements OnInit {

  userDataForm:FormGroup;

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  constructor(public popoverController: PopoverController,private authService:AuthService,private router:Router) { }

  async presentPopoverLeanBulk(ev: any) {
    const popover = await this.popoverController.create({
      component: LeanBulkComponent,
      cssClass: 'my-custom-class1',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentPopoverBulk(ev: any) {
    const popover = await this.popoverController.create({
      component: BulkComponent,
      cssClass: 'my-custom-class2',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentPopoverWeightLoss(ev: any) {
    const popover = await this.popoverController.create({
      component: LoseWeightComponent,
      cssClass: 'my-custom-class3',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  ngOnInit() {
     this.userDataForm=new FormGroup({
     age:new FormControl(null,[Validators.required,Validators.min(18)]),
     gender:new FormControl(null,Validators.required),
     height:new FormControl(null,Validators.required),
     weight:new FormControl(null,Validators.required),
     bodyType:new FormControl(null,Validators.required),
     activityLevel:new FormControl(null,Validators.required),
     goal:new FormControl(null,Validators.required),
     avatar:new FormControl(null,Validators.required),
    });
  }

  onDataEntered(){
    console.log(this.userDataForm);
  }

}
