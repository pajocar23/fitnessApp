import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private loadingController: LoadingController) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }


  onLogIn() {
    if (!this.authService.isUserAdmin) {
      this.authService.userIsAdmin;
    } else {
      this.authService.userIsNotAdmin;
    }

    this.loadingController.create({ message: "Logging in..." }).then((loadingEl: HTMLIonLoadingElement) => {
      loadingEl.present();

      this.authService.login(this.loginForm.value).subscribe(resData => {
        console.log("Logging in successful");
        console.log(resData);
        loadingEl.dismiss();
        this.router.navigateByUrl("/landing/tabs/explore");
      });

    })

    // this.authService.login(this.loginForm.value).subscribe(resData=>{
    //   console.log(resData);
    //   this.router.navigateByUrl("/landing/tabs/explore");
    // });
    //console.log(this.loginForm);
  }

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
 
  hideShowPassword() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
 

}
