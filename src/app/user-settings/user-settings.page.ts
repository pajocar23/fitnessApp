import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { userMetrics } from '../auth/user-data/userMetrics.model';
import { UserMetricsService } from '../auth/user-metrics.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit {

  userMetrics:userMetrics;
  avatarUrl:string;

  constructor(private userMetricsService:UserMetricsService,private authService:AuthService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.userMetricsService.getLoggedUserMetrics(this.authService.logedUserID).subscribe(resData=>{
      console.log("podaci za popunjavanje");
      console.log(resData);
      this.userMetrics=resData;
    });
  }



}
