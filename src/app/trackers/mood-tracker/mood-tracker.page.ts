import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mood-tracker',
  templateUrl: './mood-tracker.page.html',
  styleUrls: ['./mood-tracker.page.scss'],
})
export class MoodTrackerPage implements OnInit {

  @Input() happy:number;
  @Input() rested:number;
  @Input() hurt:number;

  @Input() recommandedhappy:number;
  @Input() recommandedrested:number;
  @Input() recommandedhurt:number;

  @Input()recommandedMindState:number;
  @Input()mindState:number;

  mindStatePercentage:number;
  mindStateUdeo:number;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  addHappyAmount(amount: number) {
    this.happy = amount;
  }

  addRestedAmount(amount: number) {
    this.rested = amount;
  }

  addHurtAmount(amount: number) {
    this.hurt = amount;
  }

  calculateMindState(){
    this.mindState=Math.ceil((this.happy/2+this.rested/2)-(this.hurt/1.1)); //formula for mind state
    this.mindStatePercentage=Math.ceil(((this.mindState * 100) / this.recommandedMindState));
    this.mindStateUdeo = this.mindStatePercentage / 100;

    if(this.mindState<0){
      this.mindState=0;
      this.mindStatePercentage=0;
      this.mindStateUdeo=0;
    }


    this.dismiss();
  }
  

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
      'mindStatePercentage':this.mindStatePercentage,
      'mindStateUdeo':this.mindStateUdeo,
      'mindState':this.mindState,
      'happy':this.happy,
      'rested':this.rested,
      'hurt':this.hurt
    });
  }

}
