import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sleep-tracker',
  templateUrl: './sleep-tracker.page.html',
  styleUrls: ['./sleep-tracker.page.scss'],
})
export class SleepTrackerPage implements OnInit {

  @Input() recommanded_hours_of_sleep: number;
  @Input() total_time_slept: number;
  @Input() total_hours_slept: number;
  @Input() total_minutes_slept: number;
  @Input() condition:boolean;

  hours: number;
  minutes: number;

  stringTime: string;

  sleepPercentage: number;
  sleepUdeo: number;

  addedSleepValue = new Date();


  constructor(public modalController: ModalController) {
  }

  addSleepAmount(amount: any) {
    if (this.condition == true) {
      this.stringTime = String(amount);
      var stringHours;
      var stringMinutes;

      stringHours = this.stringTime.substring(0, 2);
      this.total_hours_slept = +stringHours;

      stringMinutes = this.stringTime.substring(3, 5);
      this.total_minutes_slept = +stringMinutes;

      this.total_time_slept = this.total_hours_slept * 60 + this.total_minutes_slept;
      //60*0.broj posle zareza

      this.sleepPercentage = Math.ceil(((this.total_time_slept * 100) / (this.recommanded_hours_of_sleep * 60)));
      this.sleepUdeo = this.sleepPercentage / 100;
      this.condition = false;
    }
  }

  resetSleep() {
    this.condition = true;
    this.total_hours_slept = 0;
    this.sleepUdeo = 0;
    this.sleepPercentage = 0;
  }

  ngOnInit() {
  }

  dismiss() {
    /*console.log("sati i minuti");
    console.log(this.total_hours_slept);
    console.log(this.total_minutes_slept);*/

    this.modalController.dismiss({
      'dismissed': true,
      'total_time_slept': this.total_time_slept,
      'total_hours_slept': this.total_hours_slept,
      'total_minutes_slept': this.total_minutes_slept,
      'sleep_percentage': this.sleepPercentage,
      'sleep_udeo': this.sleepUdeo,
      'condition':this.condition
    });
  }
}
