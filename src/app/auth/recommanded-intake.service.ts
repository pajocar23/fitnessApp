import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserMetricsService } from './user-metrics.service';

interface recommandedAmounts {
  recommendedWater: string;
  recommendedCalories: string;
  recommendedProteins: string;
  recommendedCarbs: string;
  recommendedFats: string;
  recommendedSleep: string;
  userId: string; //spoljni kljuc ka tabeli korisnika
}

@Injectable({
  providedIn: 'root'
})
export class RecommandedIntakeService {

  _recommendedAmountOfWater: number = 0;

  _recommendedAmountOfCalories: number = 0;
  _recommendedAmountOfCarbs: number = 0;
  _recommendedAmountOfProtein: number = 0;
  _recommendedAmountOfFats: number = 0;

  _recommendedAmountOfSleep: number = 0;

  constructor(private http: HttpClient, private userMetricsService:UserMetricsService,private authService:AuthService) { }

  addUserRecommendedAmounts(recommendedAmountOfWater:number,recommendedAmountOfCalories:number,recommendedAmountOfCarbs:number,recommendedAmountOfProtein:number,recommendedAmountOfFats:number,recommendedAmountOfSleep:number,userId: string) {
    console.log("id je:" + this.userMetricsService._localUserId);
    return this.http.post<{ name: string }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userRecommendedAmounts.json`,
      { recommendedAmountOfWater,recommendedAmountOfCalories,recommendedAmountOfCarbs,recommendedAmountOfProtein,recommendedAmountOfFats,recommendedAmountOfSleep,userId});
  }

  getUserRecommendedAmounts() {
    return this.http.get<{ [key: string]: recommandedAmounts }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userRecommendedAmounts.json`);
  }

  getUserRecommendedAmountsForLoggedUser() {
    console.log("Ulogovan userov id: "+this.authService._logedUserID);
    //ovde trebamo dobaviti samo one reccomanded amonute od ida ulgovanog usera
  }


  calculateBMR(weight: number, height: number, age: number, gender: string) {
    if (gender == "Male") {
      return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
    } else if (gender == "Female") {
      return Math.round( 10 * weight + 6.25 * height - 5 * age - 161);
    }
  }

  calculateHBE(activityLevel: string, BMR: number) {
    if (activityLevel == "No activity") {
      return Math.round(BMR * 1.2);
    } else if (activityLevel == "Little activity") {
      return Math.round(BMR * 1.375);
    } else if (activityLevel == "Moderate activity") {
      return Math.round(BMR * 1.55);
    } else if (activityLevel == "Strong activity") {
      return Math.round(BMR * 1.725);
    } else {  //Very strong
      return Math.round(BMR * 1.9);
    }
  }

  //Water
  calculateRecommendedAmountOfWater(gender: string, activityLevel: string) {
    if (gender == "Male") {
      if (activityLevel == "No activity") {
        this._recommendedAmountOfWater = 3 + 1;
      } else if (activityLevel == "Little activity") {
        this._recommendedAmountOfWater = 3 + 1.2;
      } else if (activityLevel == "Moderate activity") {
        this._recommendedAmountOfWater = 3 + 1.3;
      } else if (activityLevel == "Strong activity") {
        this._recommendedAmountOfWater = 3 + 1.4;
      } else {  //Very strong
        this._recommendedAmountOfWater = 3 + 1.5;
      }
    } else if (gender == "Female") {
      if (activityLevel == "No activity") {
        this._recommendedAmountOfWater = 2 + 1;
      } else if (activityLevel == "Little activity") {
        this._recommendedAmountOfWater = 2 + 1.2;
      } else if (activityLevel == "Moderate activity") {
        this._recommendedAmountOfWater = 2 + 1.3;
      } else if (activityLevel == "Strong activity") {
        this._recommendedAmountOfWater = 2 + 1.4;
      } else {  //Very strong
        this._recommendedAmountOfWater = 2 + 1.5;
      }
    } else {
      this._recommendedAmountOfWater = 0;
    }
  }

  //Food

  calulateRecommendedAmountOfCalories(age: number, height: number, weight: number, gender: string, activityLevel: string) {
    this._recommendedAmountOfCalories = this.calculateHBE(activityLevel, this.calculateBMR(weight, height, age, gender));
  }

  calculateRecommendedAmountOfCarbs(goal: string) {
    if (goal == "Lean bulk") {
      this._recommendedAmountOfCarbs = Math.round(this._recommendedAmountOfCalories * 0.36);
    } else if (goal == "Bulk") {
      this._recommendedAmountOfCarbs = Math.round(this._recommendedAmountOfCalories * 0.4);
    } else if (goal == "Weight loss") {
      this._recommendedAmountOfCarbs = Math.round(this._recommendedAmountOfCalories * 0.35);
    }
  }

  calculateRecommendedAmountOfProtein(goal: string) {
    if (goal == "Lean bulk") {
      this._recommendedAmountOfProtein = Math.round(this._recommendedAmountOfCalories * 0.4);
    } else if (goal == "Bulk") {
      this._recommendedAmountOfProtein = Math.round(this._recommendedAmountOfCalories * 0.3);
    } else if (goal == "Weight loss") {
      this._recommendedAmountOfProtein = Math.round(this._recommendedAmountOfCalories * 0.35);
    }
  }

  calculateRecommendedAmountOfFats(goal: string) {
    if (goal == "Lean bulk") {
      this._recommendedAmountOfFats = Math.round(this._recommendedAmountOfCalories * 0.24);
    } else if (goal == "Bulk") {
      this._recommendedAmountOfFats = Math.round(this._recommendedAmountOfCalories * 0.3);
    } else if (goal == "Weight loss") {
      this._recommendedAmountOfFats = Math.round(this._recommendedAmountOfCalories * 0.3);
    }
  }

  //Sleep

  calculateRecommendedAmountOfSleep(age: number) {
    if (age < 64) {
      this._recommendedAmountOfSleep = 8;
    } else {
      this._recommendedAmountOfSleep = 7;
    }
  }



}
