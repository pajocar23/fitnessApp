import { HttpClient } from '@angular/common/http';
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

  constructor(private http:HttpClient,private authService: AuthService, private router: Router, private loadingController: LoadingController) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("jacovicp@gmail.com", [Validators.required, Validators.email]),
      password: new FormControl("Sifrica9!", [Validators.required]),
    });
  }


  onLogIn() {
    
    //umesto ovoga, procitati iz baze//get all
    //this.authService.userIsNotAdmin();
    
    this.loadingController.create({ message: "Logging in..." }).then((loadingEl: HTMLIonLoadingElement) => {
      loadingEl.present();

      this.authService.login(this.loginForm.value).subscribe(resData => {
        console.log("Logging in successful");
        //console.log(resData);
        this.authService._logedUserID=resData.localId;
        loadingEl.dismiss();
        this.router.navigateByUrl("/landing/tabs/explore");


        this.authService.isLogedUserAdmin().subscribe(resData=>{
          if(resData==true){
            //console.log("res data je true");
            this.authService.userIsAdmin();
          }else{
            //console.log("res data je false");
            this.authService.userIsNotAdmin();
          }
        });

        
      });
    })


  }

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
 
  hideShowPassword() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
 

}
