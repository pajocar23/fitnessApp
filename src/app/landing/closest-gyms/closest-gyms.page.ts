import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { Gym } from './Gym.model';
declare var google: any;


@Component({
  selector: 'app-closest-gyms',
  templateUrl: './closest-gyms.page.html',
  styleUrls: ['./closest-gyms.page.scss'],
})
export class ClosestGymsPage {

  markers2 = [];
  myLat;
  myLng;

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  infoWindows: any = [];
  
  //ovaj niz markera trebaju biti teretane
  markers: any = [{
    title: "Athletics gym Vozdovac",
    latitude: "44.760828",
    longitude: "20.485671"
  }, {
    title: "Ahilej gym Vozdovac",
    latitude: "44.773370",
    longitude: "20.485671"
  }];

  map: any;

  constructor(private http: HttpClient) { }

  ionViewDidEnter() {
    this.getMyLocation().subscribe(resData => {
      this.myLat = resData["location"]["lat"];
      this.myLng = resData["location"]["lng"];

      this.getAllGymsNearby(this.myLat,this.myLng).subscribe(resData => {
        var _tmp = [];
        for (let res of resData["results"]) {
          var latitude = res["geometry"]["location"]["lat"];
          var longitude = res["geometry"]["location"]["lng"];
          var title = res["name"];
          var vicinity = res["vicinity"];
          //console.log(vicinity);
          let res_temp={latitude:latitude,longitude:longitude,title:title,vicinity:vicinity};

          _tmp.push(res_temp);

        }
        this.markers2 = _tmp;

        this.showMap();

      });
    });

  }

  getAllGymsNearby(Latitude: string, Longitude: string) {
    return this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + Latitude + ',' + Longitude + '&radius=1000&type=gym&keyword=teretana&key=AIzaSyBb4QxfgGK_m_dvxdeO3Czo--ZjinKew6I');
  }

  getMyLocation() {
    return this.http.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBb4QxfgGK_m_dvxdeO3Czo--ZjinKew6I',
    {
      "homeMobileCountryCode": 220,
      "homeMobileNetworkCode": 3,
      "radioType": "gsm",
      "considerIp": true,
      "cellTowers": [
        // See the Cell Tower Objects section below.
      ],
      "wifiAccessPoints": [
        // See the WiFi Access Point Objects section below.
      ]
    });
  }

  addMarkersToMap(markers) {
    console.log(markers.length);
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude,
        vicinity:marker.vicinity
      });
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content">' +
      '<h2 style="color:black;" id="firstHeading" class="firstHeading">' + marker.title + '</h2>' +
      '<p style="color:black;">Latitude: ' + marker.latitude + '</p>' +
      '<p style="color:black;">Longitude: ' + marker.longitude + '</p>' +
      '<p style="color:black;">Address: ' + marker.vicinity + '</p>' +
      '<ion-button id="navigate" color="primary">Navigate</ion-button>' +
      '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);

      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        document.getElementById('navigate').addEventListener('click', () => {
          //console.log('navigate button clicked!');
          //code to navigate using google maps app
          window.open('https://www.google.com/maps/dir/?api=1&destination=' + marker.latitude + ',' + marker.longitude);
        });
      });


    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }


  //44.76654855185074, 20.480055640317442
  showMap() {

    const location = new google.maps.LatLng(this.myLat,this.myLng);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: false
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers2);
  }


}
