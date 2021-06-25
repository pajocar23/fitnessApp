import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-activity-tracker',
  templateUrl: './activity-tracker.page.html',
  styleUrls: ['./activity-tracker.page.scss'],
})
export class ActivityTrackerPage implements OnInit {

  sliderValue: number = 0;
  @Input() desiredDistance: number;
  statusMessage: string = "";

  startLat: number = 0;
  startLng: number = 0;

  currentLat: number = 0;
  currentLng: number = 0;
  @Input() distanceTraveled: string;

  finishedLat: number = 0;
  finishedLng: number = 0;


  @Input() addActivityCondition:boolean;

  //conditions
  startTrackingCondition: boolean = false;
  stopTrackingCondition: boolean = false;
  addDistanceCondition: boolean = true;
  viewProgressCondition: boolean = false;

  constructor(public modalController: ModalController, private http: HttpClient,private alertController: AlertController,private loadingController: LoadingController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true,
      'desiredDistance':this.desiredDistance,
      'distanceTraveled': this.distanceTraveled,
      'addActivityCondition':this.addActivityCondition
    });
  }

  startTracking() {
    this.statusMessage = "Tracking in progress";
    this.stopTrackingCondition = true;
    this.viewProgressCondition=true;
    this.addDistanceCondition = false;
    this.getMyLocation().subscribe(resData => {
      this.startLat = resData["location"]["lat"];
      this.startLng = resData["location"]["lng"];
      console.log(this.startLat);
      console.log(this.startLng);
    });
  }

  stopTracking() {
    this.statusMessage = "Tracking has finished";
    this.getMyLocation().subscribe(resData => {
      this.finishedLat = resData["location"]["lat"];
      this.finishedLng = resData["location"]["lng"];
      this.getDistance(this.startLat, this.startLng, this.finishedLat, this.finishedLng).subscribe(resData => {
        console.log(resData["rows"][0]["elements"][0]["distance"]["text"]);
        this.distanceTraveled = resData["rows"][0]["elements"][0]["distance"]["text"];
      });
    });
    this.addDistanceCondition = false;
    this.startTrackingCondition = false;
    this.stopTrackingCondition = false;
    this.viewProgressCondition=false;
  }

  addDesiredDistance(value: number) {
    this.desiredDistance = value;
    //console.log("this.desiredDistance iz modela");
    //console.log(this.desiredDistance);
    if (value > 0) {
      this.statusMessage="";
      this.startTrackingCondition = true;
    }else{
      this.statusMessage="Please enter more than 0 km";
    }
  }

  viewProgress() {
    console.log("viewProgress");
    this.getMyLocation().subscribe(resData => {
      this.currentLat = resData["location"]["lat"];
      this.currentLng = resData["location"]["lng"];

      this.getDistance(this.startLat, this.startLng, this.currentLat, this.currentLng).subscribe(resData => {
        console.log(resData["rows"][0]["elements"][0]["distance"]["text"]);
        this.distanceTraveled = resData["rows"][0]["elements"][0]["distance"]["text"];
      });

    });
  }

  async presentAlertStopTracking() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Warning',
      message: 'Are you sure you want to stop tracking? All data will be submited if you do.',
      buttons: [{
        text: "Yes",
        handler: () => {
          this.loadingController.create({ message: "Finishing and submittingf data..." }).then((loadingEl: HTMLIonLoadingElement) => {
            loadingEl.present();    
            this.stopTracking();
            loadingEl.dismiss();
            this.addActivityCondition=true;
            console.log("submited");
          })
        }
      },
      {
        text: "No",
        handler: () => {
          console.log("not submited");
        }
      }
      ]
    });

    await alert.present();
  }

  getMyLocation() {
    return this.http.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBb4QxfgGK_m_dvxdeO3Czo--ZjinKew6I', {});
  }

  getDistance(startLat: number, startLng: number, currentLat: number, currentLng: number) {
    //console.log("startLat");
    //console.log(startLat);
    //console.log("startLng");
    //console.log(startLng);
    //console.log("currentLat");
    //console.log(currentLat);
    //console.log("currentLng");
    //console.log(currentLng);
    return this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + startLat + ',' + startLng + '&destinations=' + currentLat + ',' + currentLng + '&key=AIzaSyBb4QxfgGK_m_dvxdeO3Czo--ZjinKew6I');
  }



}
