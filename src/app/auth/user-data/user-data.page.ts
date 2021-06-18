import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { UserMetricsService } from '../user-metrics.service';
import { User } from '../user.model';
import { BulkComponent } from './bulk/bulk.component';
import { LeanBulkComponent } from './lean-bulk/lean-bulk.component';
import { LoseWeightComponent } from './lose-weight/lose-weight.component';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.page.html',
  styleUrls: ['./user-data.page.scss'],
})
export class UserDataPage implements OnInit {

  userDataForm: FormGroup;

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  constructor(public popoverController: PopoverController, private authService: AuthService, private router: Router, private userMetricsService: UserMetricsService) { }

  ngOnInit() {
    this.userDataForm = new FormGroup({
      name: new FormControl("a", [Validators.required]),
      surname: new FormControl("a", [Validators.required]),
      age: new FormControl(18, [Validators.required, Validators.min(18)]),
      gender: new FormControl("Male", Validators.required),
      height: new FormControl("190", Validators.required),
      weight: new FormControl("100", Validators.required),
      bodyType: new FormControl("AboveAverage", Validators.required),
      activityLevel: new FormControl("No activity", Validators.required),
      goal: new FormControl("loseWeight", Validators.required),
      avatar: new FormControl(null, Validators.required),
    });
  }

  //////////////////////////////////////////////////////////////// popovers
  async presentPopoverLeanBulk(ev: any) {
    const popover = await this.popoverController.create({
      component: LeanBulkComponent,
      cssClass: 'my-custom-class1',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentPopoverBulk(ev: any) {
    const popover = await this.popoverController.create({
      component: BulkComponent,
      cssClass: 'my-custom-class2',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentPopoverWeightLoss(ev: any) {
    const popover = await this.popoverController.create({
      component: LoseWeightComponent,
      cssClass: 'my-custom-class3',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  //////////////////////////////////////////////////////////////// popovers

  onDataEntered() {

    var _name = this.userDataForm.value.name;
    var _surname = this.userDataForm.value.surname;
    var _age = this.userDataForm.value.age;
    var _gender = this.userDataForm.value.gender;
    var _height = this.userDataForm.value.height;
    var _weight = this.userDataForm.value.weight;
    var _bodyType = this.userDataForm.value.bodyType;
    var _activityLevel = this.userDataForm.value.activityLevel;
    var _goal = this.userDataForm.value.goal;
    var _userId;

    //na osnovu ovih podataka trebam pozvati servis koji cu napraviti, koji ce da mi preko formula izracunava preporucene kolicine, i da setuje pocetne na 0, i da sve to
    //ubaci u bazu u novu tabelu. Nakon toga iz te tabele treba se citati kolike su te vrednosti, i sve njih setovati na formama

    

    var email = this.authService._email;
    var password = this.authService._password;
    //obezbediti hashing ovog passworda, tako da mu se ne moze pristupiti 

    this.authService.register({email,password}).subscribe(resData => {  //dobija se observable i zato moramo da se subscibujemo na taj observable
      console.log("Registracija uspela");
      console.log(resData);
      console.log("Spoljni kljuc: "+resData.localId);
      this.userMetricsService._localUserId=resData.localId;
      _userId=this.userMetricsService._localUserId;

      //prvo se registrujemo i setujemo userId pa se onda subsribujemo da bi ubacili metrike korisnika u bazu
      this.userMetricsService.addUserMetrics(_name, _surname, _age, _gender, _height, _weight, _bodyType, _activityLevel, _goal, _userId).subscribe(resData => {
        console.log("Subscribujemo se");
        console.log(resData);
      });

    });

    this.router.navigateByUrl("/landing");



  }

  

}
