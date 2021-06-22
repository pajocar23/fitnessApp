import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-closest-gyms',
  templateUrl: './closest-gyms.page.html',
  styleUrls: ['./closest-gyms.page.scss'],
})
export class ClosestGymsPage implements OnInit {


  constructor(private http:HttpClient) { }
  //AIzaSyAqrL_6ePRhX9H45IoE63COZ4B1nvveKMY
  ngOnInit() {
  }


  getMap(){
    // return this.http.get<{ [key: string]: userMetricsData }>(``);
  }

}
