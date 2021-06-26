import { Component, OnInit, Renderer2 } from '@angular/core';
import { AppThemeService } from '../auth/app-theme.service';
import { AuthService } from '../auth/auth.service';
import { userMetrics } from '../auth/user-data/userMetrics.model';
import { UserMetricsService } from '../auth/user-metrics.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
})
export class UserSettingsPage implements OnInit {

  userMetrics: userMetrics;
  avatarUrl: string;
  toogleChecked: boolean;

  constructor(private userMetricsService: UserMetricsService, private authService: AuthService, private renderer: Renderer2, private appThemeService: AppThemeService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.appThemeService.getloggedUserTheme(this.authService.logedUserID).subscribe(resData => {
      if (resData.theme == "dark") {
        this.toogleChecked = true;
        this.renderer.setAttribute(document.body, 'color-theme', 'dark');
      } else {
        this.toogleChecked = false;
        this.renderer.setAttribute(document.body, 'color-theme', 'light');
      }
    });

    this.userMetricsService.getLoggedUserMetrics(this.authService.logedUserID).subscribe(resData => {
      console.log("podaci za popunjavanje");
      console.log(resData);
      this.userMetrics = resData;
    });
  }

  onToggleColorTheme(event) {

    this.appThemeService.getloggedUserTheme(this.authService.logedUserID).subscribe(resData => {
      var loggedUserThemeId = resData.id;
      if (event.detail.checked) {
        //document.body.setAttribute('color-theme','dark');
        this.renderer.setAttribute(document.body, 'color-theme', 'dark');
        this.appThemeService.updateLoggedUserTheme(loggedUserThemeId, "dark", this.authService.logedUserID).subscribe(resData => {
        });
      } else {
        //document.body.setAttribute('color-theme','light');
        this.renderer.setAttribute(document.body, 'color-theme', 'light');
        this.appThemeService.updateLoggedUserTheme(loggedUserThemeId, "light", this.authService.logedUserID).subscribe(resData => {
        });
      }
    });

  }
}





