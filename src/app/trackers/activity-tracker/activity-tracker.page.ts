import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-activity-tracker',
  templateUrl: './activity-tracker.page.html',
  styleUrls: ['./activity-tracker.page.scss'],
})
export class ActivityTrackerPage implements OnInit {

  sliderValue: number = 0;
  desiredDistance: number = 0;
  statusMessage: string = "";

  startLat: number = 0;
  startLng: number = 0;

  currentLat: number = 0;
  currentLng: number = 0;
  currendDistanceTraveled:number=0;

  finishedLat: number = 0;
  finishedLng: number = 0;
  finalDistanceTraveled:number=0;

  constructor(public modalController: ModalController, private http: HttpClient) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  startTracking() {
    console.log("startTracking");
    this.statusMessage = "Started tracking";
    this.getMyLocation().subscribe(resData => {
      this.startLat = resData["location"]["lat"];
      this.startLng = resData["location"]["lng"];
      console.log(this.startLat);
      console.log(this.startLng);
    });
  }

  stopTracking() {
    console.log("stopTracking");
    this.statusMessage = "Tracking has finished";
    this.getMyLocation().subscribe(resData => {
      this.finishedLat = resData["location"]["lat"];
      this.finishedLng = resData["location"]["lng"];
      this.getDistance(this.startLat,this.startLng,this.finishedLat,this.finishedLng).subscribe(resData=>{
        console.log(resData["rows"][0]["elements"][0]["distance"]["text"]);
        this.finalDistanceTraveled=resData["rows"][0]["elements"][0]["distance"]["text"];
      });
    });
  }

  addDesiredDistance(value: number) {
    console.log("addDistance");
    this.desiredDistance = value;
  }

  viewProgress() {
    console.log("viewProgress");
    this.getMyLocation().subscribe(resData => {
      this.currentLat = resData["location"]["lat"];
      this.currentLng = resData["location"]["lng"];

      this.getDistance(this.startLat,this.startLng,this.currentLat,this.currentLng).subscribe(resData=>{
        console.log(resData["rows"][0]["elements"][0]["distance"]["text"]);
        this.currendDistanceTraveled=resData["rows"][0]["elements"][0]["distance"]["text"];
      });

    });
  }



  getMyLocation() {
    return this.http.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBb4QxfgGK_m_dvxdeO3Czo--ZjinKew6I', {});
  }

  getDistance(startLat: number, startLng: number, currentLat: number, currentLng: number) {
    console.log("startLat");
    console.log(startLat);
    console.log("startLng");
    console.log(startLng);
    console.log("currentLat");
    console.log(currentLat);
    console.log("currentLng");
    console.log(currentLng);
    return this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+startLat+','+startLng+'&destinations='+currentLat+','+currentLng+'&key=AIzaSyBb4QxfgGK_m_dvxdeO3Czo--ZjinKew6I');
  }



}
