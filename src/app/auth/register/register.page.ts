import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserMetricsService } from '../user-metrics.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registrationForm: FormGroup;
  constructor(private authService: AuthService, private router: Router,private userMetricsService: UserMetricsService) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: new FormControl("jacovicp@gmail.com", [Validators.required, Validators.email]),
      password: new FormControl("Sifrica9!", [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
      confirmPassword: new FormControl("Sifrica9!", [Validators.required, this.matchValues('password')])
    }); //at least one lowercase char,at least one uppercase char,at least one number,(no matter the order)
  }

  onRegister() {
    this.authService.setIsRegisteredToTrue(); //ovo nam dozvoljava da prodjemo gard da bi pristupili stranici gde unosimo metrike
    //this.authService.userIsNotAdmin();

    //setujemo vrednosti parametra koje cemo posle proslediti (obavezno ih prikriti)

    this.authService._email=this.registrationForm.value.email;
    this.authService._password=this.registrationForm.value.password;
    //OBAVEZNO: obezbediti da sifra nije dostupna ovako lako, hashhing ili neki seter preko private

    console.log("idemo na stranicu za metrike");
    
    this.router.navigateByUrl("/user-data");  

  }

  matchValues(
    matchTo: string //  matcher
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }


}
