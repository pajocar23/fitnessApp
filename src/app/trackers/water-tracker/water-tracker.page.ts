import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { ConsumedAmountService } from 'src/app/auth/consumed-amount.service';

@Component({
  selector: 'app-water-tracker',
  templateUrl: './water-tracker.page.html',
  styleUrls: ['./water-tracker.page.scss'],
})
export class WaterTrackerPage implements OnInit {

  @Input() recommanded_amount_of_water: number;
  @Input() drank_amount_total: number;

  waterPercentage: number;
  waterUdeo: number;


  sliderValue: number=0;


  addWaterAmount(amount: number) {
    this.drank_amount_total = this.drank_amount_total + amount;
    this.waterPercentage = Math.ceil(((this.drank_amount_total * 100) / this.recommanded_amount_of_water));
    this.waterUdeo = this.waterPercentage / 100;
  }

  resetWater() {
    this.drank_amount_total = 0;
    this.waterUdeo = 0;
    this.waterPercentage = 0;
  }

  constructor(public modalController: ModalController,public consumedAmountService:ConsumedAmountService,private authService:AuthService) {

  }

  


  ngOnInit() {
    
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
      'total_drank_amount': this.drank_amount_total,
      'water_udeo': this.waterPercentage,
      'water_percentage': this.waterUdeo
      
    });

  }

  // this.waterPercentage=(this.drankAmountTotal*100)/this.recommandedAmountOfWater;
  //  console.log("prva"+this.waterPercentage);
}
