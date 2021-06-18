import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecommandedIntakeService {

  recommendedAmountOfWater: number = 0;

  recommendedAmountOfCalories: number = 0;
  recommendedAmountOfCarbs: number = 0;
  recommendedAmountOfProtein: number = 0;
  recommendedAmountOfFats: number = 0;

  recommendedAmountOfSleep: number = 0;

  constructor() { }

  calculateBMR(weight: number, height: number, age: number, gender: string) {
    if (gender == "Male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender == "Female") {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  }

  calculateHBE(activityLevel: string, BMR: number) {
    if (activityLevel == "No activity") {
      return BMR * 1.2;
    } else if (activityLevel == "Little activity") {
      return BMR * 1.375;
    } else if (activityLevel == "Moderate activity") {
      return BMR * 1.55;
    } else if (activityLevel == "Strong activity") {
      return BMR * 1.725;
    } else {  //Very strong
      return BMR * 1.9;
    }
  }

  //Water
  calculateRecommendedAmountOfWater(gender: string, activityLevel: string) {
    if (gender == "Male") {
      if (activityLevel == "No activity") {
        this.recommendedAmountOfWater = 3 + 1;
      } else if (activityLevel == "Little activity") {
        this.recommendedAmountOfWater = 3 + 1.2;
      } else if (activityLevel == "Moderate activity") {
        this.recommendedAmountOfWater = 3 + 1.3;
      } else if (activityLevel == "Strong activity") {
        this.recommendedAmountOfWater = 3 + 1.4;
      } else {  //Very strong
        this.recommendedAmountOfWater = 3 + 1.5;
      }
    } else if (gender == "Female") {
      if (activityLevel == "No activity") {
        this.recommendedAmountOfWater = 2 + 1;
      } else if (activityLevel == "Little activity") {
        this.recommendedAmountOfWater = 2 + 1.2;
      } else if (activityLevel == "Moderate activity") {
        this.recommendedAmountOfWater = 2 + 1.3;
      } else if (activityLevel == "Strong activity") {
        this.recommendedAmountOfWater = 2 + 1.4;
      } else {  //Very strong
        this.recommendedAmountOfWater = 2 + 1.5;
      }
    } else {
      this.recommendedAmountOfWater = 0;
    }
  }

  //Food

  calulateRecommendedAmountOfCalories(age: number, height: number, weight: number, gender: string, activityLevel: string) {
    this.recommendedAmountOfCalories = this.calculateHBE(activityLevel, this.calculateBMR(weight, height, age, gender));
  }

  calculateRecommendedAmountOfCarbs(goal:string) {
    if(goal=="Lean bulk"){
      this.recommendedAmountOfCarbs=this.recommendedAmountOfCalories*0.36;
    }else if(goal=="Bulk"){
      this.recommendedAmountOfCarbs=this.recommendedAmountOfCalories*0.4;
    }else if(goal=="Weight loss"){
      this.recommendedAmountOfCarbs=this.recommendedAmountOfCalories*0.35;
    }
  }

  calculateRecommendedAmountOfProtein(goal:string) {
    if(goal=="Lean bulk"){
      this.recommendedAmountOfProtein=this.recommendedAmountOfCalories*0.4;
    }else if(goal=="Bulk"){
      this.recommendedAmountOfProtein=this.recommendedAmountOfCalories*0.3;
    }else if(goal=="Weight loss"){
      this.recommendedAmountOfProtein=this.recommendedAmountOfCalories*0.35;
    }
  }

  calculateRecommendedAmountOfFats(goal:string) {
    if(goal=="Lean bulk"){
      this.recommendedAmountOfFats=this.recommendedAmountOfCalories*0.24;
    }else if(goal=="Bulk"){
      this.recommendedAmountOfFats=this.recommendedAmountOfCalories*0.3;
    }else if(goal=="Weight loss"){
      this.recommendedAmountOfFats=this.recommendedAmountOfCalories*0.3;
    }
  }

  //Sleep

  calculateRecommendedAmountOfSleep(age:number) {
    if(age<64){
      this.recommendedAmountOfSleep=8;
    }else{
      this.recommendedAmountOfSleep=7;
    }
  }



}
