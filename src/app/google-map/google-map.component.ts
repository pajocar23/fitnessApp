import { Component, ViewChild,ElementRef } from '@angular/core';

declare var google:any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent{

  @ViewChild('map',{read:ElementRef,static:false}) mapRef:ElementRef;

  map:any;
  constructor() { }

  ionViewDidEnter(){
    this.showMap();
  }

  showMap(){
    const location=new google.maps.LatLng(-17,31);
    const options={
      center:location,
      zoom:15,
      disableDefaultUI:true
    }
    this.map=new google.maps.Map(this.mapRef.nativeElement,options);
  }
}
