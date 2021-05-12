import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { BulkComponent } from './bulk/bulk.component';
import { LeanBulkComponent } from './lean-bulk/lean-bulk.component';
import { LoseWeightComponent } from './lose-weight/lose-weight.component';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.page.html',
  styleUrls: ['./user-data.page.scss'],
})
export class UserDataPage implements OnInit {

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  constructor(public popoverController: PopoverController) { }

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
  }

}
