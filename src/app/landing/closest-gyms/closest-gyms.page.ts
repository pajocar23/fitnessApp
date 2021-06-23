import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-closest-gyms',
  templateUrl: './closest-gyms.page.html',
  styleUrls: ['./closest-gyms.page.scss'],
})
export class ClosestGymsPage {

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


  markers2: any = [];

  map: any;
  constructor(private http:HttpClient) { }

  ionViewDidEnter() {
    this.markers2 = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=44.76654855185074,20.480055640317442&radius=1500&type=gym&keyword=gym&key=AIzaSyBb4QxfgGK_m_dvxdeO3Czo--ZjinKew6I';
    this.showMap();
  }

  getAllGymsNearby(){
    var response;
    response=this.http.get<{}>(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=44.76654855185074,20.480055640317442&radius=1500&type=gym&keyword=gym&key=AIzaSyBb4QxfgGK_m_dvxdeO3Czo--ZjinKew6I`);
    return response;
  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      });

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content">' +
      '<h2 id="firstHeading" class="firstHeading">' + marker.title + '</h2>' +
      '<p>Latitude: ' + marker.latitude + '</p>' +
      '<p>Longitude: ' + marker.longitude + '</p>' +
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
          console.log('navigate button clicked!');
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
    
    const location = new google.maps.LatLng(44.76654855185074, 20.480055640317442);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: false
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers);
  }


}
