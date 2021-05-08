import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-water-tracker',
  templateUrl: './water-tracker.component.html',
  styleUrls: ['./water-tracker.component.scss'],
})
export class WaterTrackerComponent implements OnInit {

  constructor(public modalController: ModalController) { }


  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
