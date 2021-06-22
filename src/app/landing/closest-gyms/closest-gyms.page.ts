import { Component,ElementRef,ViewChild } from '@angular/core';
declare var google:any;

@Component({
  selector: 'app-closest-gyms',
  templateUrl: './closest-gyms.page.html',
  styleUrls: ['./closest-gyms.page.scss'],
})
export class ClosestGymsPage{

  @ViewChild('map',{read:ElementRef,static:false}) mapRef:ElementRef;

  map:any;
  constructor() { }

  ionViewDidEnter(){
    this.showMap();
  }
//44.76654855185074, 20.480055640317442
  showMap(){
    const location=new google.maps.LatLng(44.76654855185074,20.480055640317442);
    const options={
      center:location,
      zoom:30,
      disableDefaultUI:true
    }
    this.map=new google.maps.Map(this.mapRef.nativeElement,options);
  }

}
