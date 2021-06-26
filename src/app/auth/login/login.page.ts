import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isLoading = false;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private loadingController: LoadingController,private alertCtrl: AlertController) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("jacovicp@gmail.com", [Validators.required, Validators.email]),
      password: new FormControl("Sifrica9!", [Validators.required]),
    });
  }

  onLogIn() {
    this.loadingController.create({ message: "Logging in..." }).then((loadingEl: HTMLIonLoadingElement) => {
      loadingEl.present();
      this.isLoading = true;

      if (this.loginForm.valid) {

        this.authService.login(this.loginForm.value).subscribe(resData => {
          if (resData) {
            console.log("Logging in successful");
            //console.log(resData);
            this.authService._logedUserID = resData.localId;
            loadingEl.dismiss();
            this.router.navigateByUrl("/landing/tabs/explore");
          } else {
            this.router.navigateByUrl("/login");
            console.log("Logging error");
            return;
          }
          this.authService.isLogedUserAdmin().subscribe(resData => {
            if (resData == true) {
              this.authService.userIsAdmin();
            } else {
              this.authService.userIsNotAdmin();
            }
          });
        },
        errRes => {
          loadingEl.dismiss();
          console.log(errRes);
          this.isLoading = false;
          let message = 'Incorrect email or password';

          const code = errRes.error.error.message;
          if (code === 'EMAIL_NOT_FOUND') {
            message = 'Email address could not be found.';
          } else if (code === 'INVALID_PASSWORD') {
            message = 'Incorrect password.';
          }

          this.alertCtrl.create({
            header: 'Authentication failed',
            message,
            buttons: ['Okay']
          }).then((alert) => {
            alert.present();
          });
          //this.loginForm.reset();
        });
      }
    })

  }

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }


}
