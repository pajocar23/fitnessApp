import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm:FormGroup;

  constructor(private authService:AuthService,private router:Router) { }


  ngOnInit() {
    this.loginForm=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required])
    });
  }


  onLogIn(){
    if(!this.authService.isUserAdmin){
      this.authService.userIsAdmin;
    }else{
      this.authService.userIsNotAdmin;
    }

    this.authService.login(this.loginForm.value).subscribe(resData=>{
      console.log("Sign in successfull");
      console.log(resData);
      this.router.navigateByUrl("/landing/tabs/explore");
    });
    //console.log(this.loginForm);
  }


}
