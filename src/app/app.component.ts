import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { LoadingController } from '@ionic/angular';
// import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // constructor(private authService:AuthService,private router:Router,private loadingController:LoadingController) {}

  // showAdminButtons(){
  //   if(this.authService.isUserAdmin){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }

  // onLogOut(){
  //   this.loadingController.create({message:"Logging out..."}).then((loadingEl:HTMLIonLoadingElement)=>{
  //     loadingEl.present();   
  //     loadingEl.dismiss();
  //   })


  //   this.authService.logut();
  //   this.router.navigateByUrl("/login");
  // }


}
