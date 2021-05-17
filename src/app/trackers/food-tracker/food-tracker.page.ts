import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-food-tracker',
  templateUrl: './food-tracker.page.html',
  styleUrls: ['./food-tracker.page.scss'],
})
export class FoodTrackerPage implements OnInit {

  @Input() totalCaloriesConsumed: number;
  caloriesAddedValue: number = 0;

  @Input() recommandedAmountOfCarbs: number;
  @Input() totalCarbsConsumed: number;
  carbsAddedValue: number = 0;
  carbsPercentage: number;
  carbsUdeo: number;

  @Input() recommandedAmountOfFats: number;
  @Input() totalFatsConsumed: number;
  fatsAddedValue: number = 0;
  fatsPercentage: number;
  fatsUdeo: number;

  @Input() recommandedAmountOfProtein: number;
  @Input() totalProteinConsumed: number;
  proteinAddedValue: number = 0;
  proteinPercentage: number;
  proteinUdeo: number;


  constructor(public modalController: ModalController) { }

  resetCalories() {
    if (this.totalCaloriesConsumed > 0) {
      this.totalCaloriesConsumed = 0;
      this.totalCarbsConsumed = 0;
      this.totalFatsConsumed = 0;
      this.totalProteinConsumed = 0;

      this.carbsPercentage=0;
      this.carbsUdeo=0;
      this.fatsPercentage=0;
      this.fatsUdeo=0;
      this.proteinPercentage=0;
      this.proteinUdeo=0;
    }
  }

  addCarbsAmount(amount: number) {
    if (amount > 0) {
      this.totalCarbsConsumed = this.totalCarbsConsumed + amount;
      this.totalCaloriesConsumed = this.totalCaloriesConsumed + this.carbsAddedValue * 4;

      this.carbsPercentage=((this.totalCarbsConsumed*100)/this.recommandedAmountOfCarbs);
      this.carbsUdeo=this.carbsPercentage/100;
    }
  }

  resetCarbs() {
    if (this.totalCarbsConsumed > 0 && this.totalCaloriesConsumed > 0) {
      this.totalCaloriesConsumed = this.totalCaloriesConsumed - this.totalCarbsConsumed * 4;
      this.totalCarbsConsumed = 0;

      this.carbsPercentage=0;
      this.carbsUdeo=0;

    }
  }

  addFatsAmount(amount: number) {
    if (amount > 0) {
      this.totalFatsConsumed = this.totalFatsConsumed + amount;
      this.totalCaloriesConsumed = this.totalCaloriesConsumed + this.fatsAddedValue * 8;

      this.fatsPercentage=((this.totalFatsConsumed*100)/this.recommandedAmountOfFats);
      this.fatsUdeo=this.fatsPercentage/100;
    }
  }

  resetFats() {
    if (this.totalFatsConsumed > 0 && this.totalCaloriesConsumed > 0) {
      this.totalCaloriesConsumed = this.totalCaloriesConsumed - this.totalFatsConsumed * 8;
      this.totalFatsConsumed = 0;

      this.fatsPercentage=0;
      this.fatsUdeo=0;
    }
  }

  addProteinAmount(amount: number) {
    if (amount > 0) {
      this.totalProteinConsumed = this.totalProteinConsumed + amount;
      this.totalCaloriesConsumed = this.totalCaloriesConsumed + this.proteinAddedValue * 4;

      this.proteinPercentage=((this.totalProteinConsumed*100)/this.recommandedAmountOfProtein);
      this.proteinUdeo=this.proteinPercentage/100;
    }
  }

  resetProtein() {
    if (this.totalProteinConsumed > 0 && this.totalCaloriesConsumed > 0) {
      this.totalCaloriesConsumed = this.totalCaloriesConsumed - this.totalProteinConsumed * 4;
      this.totalProteinConsumed = 0;

      this.proteinPercentage=0;
      this.proteinUdeo=0;
    }
  }



  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,

      'total_calories_consumed': this.totalCaloriesConsumed,

      'total_carbs_consumed': this.totalCarbsConsumed,
      'carbs_percentage':this.carbsPercentage,
      'carbs_udeo':this.carbsUdeo,

      'total_fats_consumed': this.totalFatsConsumed,
      'fats_percentage':this.fatsPercentage,
      'fats_udeo':this.fatsUdeo,

      'total_protein_consumed': this.totalProteinConsumed,
      'protein_percentage':this.proteinPercentage,
      'protein_udeo':this.proteinUdeo
    });
  }
}
