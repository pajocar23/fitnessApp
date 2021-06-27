import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { AuthService } from '../auth/auth.service';
import { ConsumedAmountService } from '../auth/consumed-amount.service';
import { RecommendedIntakeService } from '../auth/recommended-intake.service';
import { ActivityService } from '../trackers/activity-tracker/services/activity.service';

@Component({
  selector: 'app-trackers-history',
  templateUrl: './trackers-history.page.html',
  styleUrls: ['./trackers-history.page.scss'],
})
export class TrackersHistoryPage implements AfterViewInit {

  //for all trackers except activity
  labelsAll: String[] = [];
  labelsActivity: String[] = [];

  //water
  @ViewChild('barCanvasWater') private barCanvasWater: ElementRef;
  barChartWater: any;
  waterLevels: number[] = [];
  recommendedAmountOfWater;
  //food
  @ViewChild('barCanvasFood') private barCanvasFood: ElementRef;
  barChartFood: any;
  caloriesLevels: number[] = [];
  proteinLevels: number[] = [];
  carbsLevels: number[] = [];
  fatsLevels: number[] = [];
  recommendedAmountOfCalories;
  recommendedAmountOfProtein;
  recommendedAmountOfCarbs;
  recommendedAmountOfFats;
  //sleep
  @ViewChild('barCanvasSleep') private barCanvasSleep: ElementRef;
  barChartSleep: any;
  sleepLevels: number[] = [];
  recommendedAmountOfSleep;
  //mind state
  @ViewChild('barCanvasMind') private barCanvasMind: ElementRef;
  barChartMind: any;
  mindLevels: number[] = [];
  recommendedAmountOfMind;
  //activity state
  @ViewChild('barCanvasActivity') private barCanvasActivity: ElementRef;
  barChartActivity: any;
  activityLevels: number[] = [];
  activityLevelsEveryDay:number[]=[];
 

  constructor(private consumedAmountsService: ConsumedAmountService, private authService: AuthService, private activityService: ActivityService, private recommendedAmountService: RecommendedIntakeService) { }

  ngAfterViewInit() {
    this.recommendedAmountService.getRecommendedAmountsForLogedUser().subscribe(resData => {
      this.recommendedAmountOfWater = resData.recommendedAmountOfWater;
      this.recommendedAmountOfCalories = resData.recommendedAmountOfCalories;
      this.recommendedAmountOfProtein = resData.recommendedAmountOfProtein;
      this.recommendedAmountOfCarbs = resData.recommendedAmountOfCarbs;
      this.recommendedAmountOfFats = resData.recommendedAmountOfFats;
      this.recommendedAmountOfSleep = resData.recommendedAmountOfSleep;
      this.recommendedAmountOfMind = resData.recommendedMindState;
      /////////////////////
      this.consumedAmountsService.getConsumedAmountsForLoggedUser().subscribe(resData => {
        for (var i = resData.length - 1; i >= 0; i--) {
          if (this.labelsAll.length == 7) {
            break;
          }
          //all trackers
          var date = resData[i].date.split("/", 3);
          date[2] = date[2].substr(0, date[2].indexOf(","));
          var dateString=date[0]+"/"+date[1]+"/"+date[2]
          this.labelsAll.push(dateString);
          //water
          this.waterLevels.push(resData[i].consumedAmountOfWater);
          //food
          this.caloriesLevels.push(resData[i].consumedAmountOfCalories);
          this.proteinLevels.push(resData[i].consumedAmountOfProtein * 4);
          this.carbsLevels.push(resData[i].consumedAmountOfCarbs * 4);
          this.fatsLevels.push(resData[i].consumedAmountOfFats * 9);
          //sleep
          this.sleepLevels.push(resData[i].consumedAmountOfSleep / 60);
          //mind
          this.mindLevels.push(resData[i].consumedAmountOfMindState);
        }
        //all trackers except activity
        this.labelsAll = this.labelsAll.reverse();
        //water
        this.waterLevels = this.waterLevels.reverse();
        this.barChartMethodWater();
        //food
        this.caloriesLevels = this.caloriesLevels.reverse();
        this.proteinLevels = this.proteinLevels.reverse();
        this.carbsLevels = this.carbsLevels.reverse();
        this.fatsLevels = this.fatsLevels.reverse();
        this.barChartMethodFood();
        //sleep
        this.sleepLevels = this.sleepLevels.reverse();
        this.barChartMethodSleep();
        //mind
        this.mindLevels = this.mindLevels.reverse();
        this.barChartMethodMind();

        //activity
        this.activityService.getAllActivitiesForLoggedUser().subscribe(resData => {
          //ja moram da pokupim poslednjih 7 datuma
          //resData su aktivnosti koje mogu biti istog datuma
          //zato moram sabrati sve
          var activitiesInLast7Days = [];
          var tempDates:string[] = [];
  
          for (var i = 0; i < resData.length; i++) {
            //console.log((((((new Date()).valueOf() - new Date(resData[i].date).valueOf()) / 1000) / 60) / 60) / 24);
            if ((((((new Date()).valueOf() - new Date(resData[i].date).valueOf()) / 1000) / 60) / 60) / 24 <= 7) {
              activitiesInLast7Days.push(resData[i]);
            }
          }
  
          //console.log(activitiesInLast7Days);
  
          for (var j = 0; j < activitiesInLast7Days.length; j++) {
            var date = activitiesInLast7Days[j].date.split("/", 3);
            date[2] = date[2].substr(0, date[2].indexOf(","));
            var dateString=date[0]+"/"+date[1]+"/"+date[2]
  
            if (!tempDates.includes(dateString)) {
              tempDates.push(dateString);
            }
          }

          for (var j = 0; j < tempDates.length; j++) {
            var cumulativeDistanceTraveled:number = 0;
            var cumulativeDesiredDistance:number = 0;
            for(var k = 0; k < activitiesInLast7Days.length; k++){
              var date = activitiesInLast7Days[k].date.split("/", 3);
              date[2] = date[2].substr(0, date[2].indexOf(","));
              var dateString=date[0]+"/"+date[1]+"/"+date[2]

              if(tempDates[j]==dateString){
                cumulativeDesiredDistance=cumulativeDesiredDistance+activitiesInLast7Days[k].desiredDistance;
                cumulativeDistanceTraveled=cumulativeDistanceTraveled+ +activitiesInLast7Days[k].distanceTraveled.substr(0, activitiesInLast7Days[k].distanceTraveled.indexOf(" "));
              }
            }
            this.activityLevelsEveryDay.push(cumulativeDesiredDistance);
            this.activityLevels.push(cumulativeDistanceTraveled);
          }
  
          for (var k = 0; k < tempDates.length; k++) {
            this.labelsActivity.push(tempDates[k]);
          }
  
          this.barChartMethodActivity();
        });

      });
      /////////////////////
    });

  }

  barChartMethodWater() {
    console.log("2");
    console.log(this.recommendedAmountOfWater);
    this.barChartWater = new Chart(this.barCanvasWater.nativeElement, {
      data: {
        labels: this.labelsAll,
        datasets: [
          {
            label: 'Recommended liters of water',
            fill: false,
            type: 'line',
            //lineTension: 0.1,
            //y:'liters',
            backgroundColor: '#c528f9',
            borderColor: '#c528f9',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#c528f9',
            pointBackgroundColor: '#c528f9',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#c528f9',
            pointHoverBorderColor: '#c528f9',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.recommendedAmountOfWater, this.recommendedAmountOfWater, this.recommendedAmountOfWater,
            this.recommendedAmountOfWater, this.recommendedAmountOfWater, this.recommendedAmountOfWater, this.recommendedAmountOfWater],
            spanGaps: false,
          },
          {
            label: 'Water',
            fill: false,
            type: 'bar',
            //lineTension: 0.1,
            //y:'liters',
            backgroundColor: '#50c8ff',
            borderColor: '#50c8ff',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#50c8ff',
            pointBackgroundColor: '#50c8ff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#50c8ff',
            pointHoverBorderColor: '#50c8ff',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.waterLevels,
            spanGaps: false,
          }
        ],
      }
    });
  }

  barChartMethodFood() {
    this.barChartFood = new Chart(this.barCanvasFood.nativeElement, {
      data: {
        labels: this.labelsAll,
        datasets: [
          {
            label: 'Recommended kCal',
            fill: false,
            type: 'line',
            //lineTension: 0.1,
            //y:'liters',
            backgroundColor: '#c528f9',
            borderColor: '#c528f9',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#c528f9',
            pointBackgroundColor: '#c528f9',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#c528f9',
            pointHoverBorderColor: '#c528f9',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.recommendedAmountOfCalories, this.recommendedAmountOfCalories, this.recommendedAmountOfCalories,
            this.recommendedAmountOfCalories, this.recommendedAmountOfCalories, this.recommendedAmountOfCalories, this.recommendedAmountOfCalories],
            spanGaps: false,
          },
          {
            label: 'Recommended protein (kCal)',
            fill: false,
            type: 'line',
            //lineTension: 0.1,
            //y:'liters',
            backgroundColor: '#8e21ce',
            borderColor: '#8e21ce',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#8e21ce',
            pointBackgroundColor: '#8e21ce',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#8e21ce',
            pointHoverBorderColor: '#8e21ce',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.recommendedAmountOfProtein, this.recommendedAmountOfProtein, this.recommendedAmountOfProtein,
            this.recommendedAmountOfProtein, this.recommendedAmountOfProtein, this.recommendedAmountOfProtein, this.recommendedAmountOfProtein],
            spanGaps: false,
          },
          {
            label: 'Recommended carbohydrates (kCal)',
            fill: false,
            type: 'line',
            //lineTension: 0.1,
            //y:'liters',
            backgroundColor: '#4b126d',
            borderColor: '#4b126d',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#4b126d',
            pointBackgroundColor: '#4b126d',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#4b126d',
            pointHoverBorderColor: '#4b126d',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.recommendedAmountOfCarbs, this.recommendedAmountOfCarbs, this.recommendedAmountOfCarbs,
            this.recommendedAmountOfCarbs, this.recommendedAmountOfCarbs, this.recommendedAmountOfCarbs, this.recommendedAmountOfCarbs],
            spanGaps: false,
          },
          {
            label: 'Recommended fats (kCal)',
            fill: false,
            type: 'line',
            //lineTension: 0.1,
            //y:'liters',
            backgroundColor: '#3a0f60',
            borderColor: '#3a0f60',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#3a0f60',
            pointBackgroundColor: '#3a0f60',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#3a0f60',
            pointHoverBorderColor: '#3a0f60',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.recommendedAmountOfFats, this.recommendedAmountOfFats, this.recommendedAmountOfFats,
            this.recommendedAmountOfFats, this.recommendedAmountOfFats, this.recommendedAmountOfFats, this.recommendedAmountOfFats],
            spanGaps: false,
          },
          {
            label: 'Calories ',
            fill: false,
            type: 'bar',
            //lineTension: 0.1,
            backgroundColor: '#42d77d',
            borderColor: '#42d77d',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#42d77d',
            pointBackgroundColor: '#42d77d',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#42d77d',
            pointHoverBorderColor: '#42d77d',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.caloriesLevels,
            spanGaps: false,
          },
          {
            label: 'Protein',
            fill: false,
            //lineTension: 0.1,
            type: 'bar',
            backgroundColor: '#f97d83',
            borderColor: '#f97d83',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#f97d83',
            pointBackgroundColor: '#f97d83',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#f97d83',
            pointHoverBorderColor: '#f97d83',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.proteinLevels,
            spanGaps: false,
          },
          {
            label: 'Carbohydrates',
            fill: false,
            //lineTension: 0.1,
            type: 'bar',
            backgroundColor: '#ffca22',
            borderColor: '#ffca22',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#ffca22',
            pointBackgroundColor: '#ffca22',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#ffca22',
            pointHoverBorderColor: '#ffca22',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.carbsLevels,
            spanGaps: false,
          },
          {
            label: 'Fats',
            fill: false,
            type: 'bar',
            //lineTension: 0.1,
            backgroundColor: '#b3efff',
            borderColor: '#b3efff',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#b3efff',
            pointBackgroundColor: '#b3efff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#b3efff',
            pointHoverBorderColor: '#b3efff',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.fatsLevels,
            spanGaps: false,
          }
        ],
      }
    });
  }

  barChartMethodSleep() {
    this.barCanvasSleep = new Chart(this.barCanvasSleep.nativeElement, {
      data: {
        labels: this.labelsAll,
        datasets: [
          {
            label: 'Recommended hours of sleep',
            fill: false,
            type: 'line',
            //lineTension: 0.1,
            //y:'liters',
            backgroundColor: '#c528f9',
            borderColor: '#c528f9',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#c528f9',
            pointBackgroundColor: '#c528f9',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#c528f9',
            pointHoverBorderColor: '#c528f9',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.recommendedAmountOfSleep, this.recommendedAmountOfSleep, this.recommendedAmountOfSleep,
            this.recommendedAmountOfSleep, this.recommendedAmountOfSleep, this.recommendedAmountOfSleep, this.recommendedAmountOfSleep],
            spanGaps: false,
          },
          {
            label: 'Sleep',
            fill: false,
            type: 'bar',
            //lineTension: 0.1,
            backgroundColor: '#00d346',
            borderColor: '#00d346',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#00d346',
            pointBackgroundColor: '#00d346',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#00d346',
            pointHoverBorderColor: '#00d346',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.sleepLevels,
            spanGaps: false,
          }
        ]
      }
    });
  }

  barChartMethodMind() {
    this.barChartMind = new Chart(this.barCanvasMind.nativeElement, {
      data: {
        labels: this.labelsAll,
        datasets: [
          {
            label: 'Recommended level of mind',
            fill: false,
            type: 'line',
            //lineTension: 0.1,
            //y:'liters',
            backgroundColor: '#c528f9',
            borderColor: '#c528f9',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#c528f9',
            pointBackgroundColor: '#c528f9',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#c528f9',
            pointHoverBorderColor: '#c528f9',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.recommendedAmountOfMind, this.recommendedAmountOfMind, this.recommendedAmountOfMind,
            this.recommendedAmountOfMind, this.recommendedAmountOfMind, this.recommendedAmountOfMind, this.recommendedAmountOfMind],
            spanGaps: false,
          },
          {
            label: 'Mind',
            fill: false,
            type: 'bar',
            //lineTension: 0.1,
            backgroundColor: '#eac5cc',
            borderColor: '#eac5cc',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#eac5cc',
            pointBackgroundColor: '#eac5cc',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#eac5cc',
            pointHoverBorderColor: '#eac5cc',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.mindLevels,
            spanGaps: false,
          }
        ]
      }
    });
  }

  barChartMethodActivity() {
    this.barChartActivity = new Chart(this.barCanvasActivity.nativeElement, {
      data: {
        labels: this.labelsActivity,
        datasets: [
          {
            label: 'Cumulative desired distances',
            fill: false,
            type: 'line',
            //lineTension: 0.1,
            //y:'liters',
            backgroundColor: '#c528f9',
            borderColor: '#c528f9',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#c528f9',
            pointBackgroundColor: '#c528f9',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#c528f9',
            pointHoverBorderColor: '#c528f9',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.activityLevelsEveryDay,
            spanGaps: false,
          },
          {
            label: 'Distnace traveled',
            fill: false,
            type: 'bar',
            //lineTension: 0.1,
            backgroundColor: '#cf3c4f',
            borderColor: '#cf3c4f',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#cf3c4f',
            pointBackgroundColor: '#cf3c4f',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#cf3c4f',
            pointHoverBorderColor: '#cf3c4fs',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.activityLevels,
            spanGaps: false,
          }
        ]
      }
    });
  }
}
