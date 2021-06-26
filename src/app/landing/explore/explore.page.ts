import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppThemeService } from 'src/app/auth/app-theme.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ConsumedAmountService } from 'src/app/auth/consumed-amount.service';
import { RecommendedIntakeService } from 'src/app/auth/recommended-intake.service';
import { BlogPost } from 'src/app/blog-posts-admin/blog-post.model';
import { BlogPostService } from 'src/app/blog-posts-admin/services/blog-post.service';
import { ActivityTrackerPage } from 'src/app/trackers/activity-tracker/activity-tracker.page';
import { ActivityModel } from 'src/app/trackers/activity-tracker/activity.model';
import { ActivityService } from 'src/app/trackers/activity-tracker/services/activity.service';
import { FoodTrackerPage } from 'src/app/trackers/food-tracker/food-tracker.page';
import { MoodTrackerPage } from 'src/app/trackers/mood-tracker/mood-tracker.page';
import { SleepTrackerPage } from 'src/app/trackers/sleep-tracker/sleep-tracker.page';
import { WaterTrackerPage } from 'src/app/trackers/water-tracker/water-tracker.page';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  //water tracker data
  recommandedAmountOfWater: number; //umesto ovih hardkodovanih vrednosti, treba se izvuci iz baze one koje imaju vrednost id kao ulogovani user
  drankAmountTotal: number;
  waterUdeo: number;
  waterPercentage: number;

  //food tracker data
  totalCaloriesConsumed: number;

  recommandedAmountOfCarbs: number;
  totalCarbsConsumed: number;
  carbsPercentage: number;
  carbsUdeo: number;

  recommandedAmountOfFats: number;
  totalFatsConsumed: number;
  fatsPercentage: number;
  fatsUdeo: number;

  recommandedAmountOfProtein: number;
  totalProteinConsumed: number;
  proteinPercentage: number;
  proteinUdeo: number;

  //sleep tracker data
  recommandedHoursOfSleep: number; //minutes
  totalTimeSlept: number;
  totalHoursSlept: number;
  totalMinutesSlept: number;
  sleepPercentage: number;
  sleepUdeo: number;
  condition: boolean = true;

  //mind state treba da bude hardkodovan, jer je bez obzira o kome se radi, isti za sve
  //mood tracker data
  recommandedhappy: number = 0;
  recommandedrested: number = 0;
  recommandedhurt: number = 0;

  recommandedMindState: number;
  mindState: number;
  mindStatePercentage: number = 0;
  mindStateUdeo: number = 0;

  happy: number = 0;
  rested: number = 0;
  hurt: number = 0;

  //activity tracker data
  desiredDistance: number;
  distanceTraveled: string;
  distancePercentage: number;
  distanceTraveledNumber: number;
  distanceUdeo: number;

  /*distanceTraveled: string;
  distancePercentage: number;
  distanceTraveledNumber:number;
  distanceUdeo: number;*/

  addActivityCondition: boolean = false;

  blogPosts: BlogPost[] = [];

  slideOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { $, slides, rtlTranslate: rtl } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let progress = $slideEl[0].progress;
          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          const rotate = -180 * progress;
          let rotateY = rotate;
          let rotateX = 0;
          let tx = -offset$$1;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }

          $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

          if (swiper.params.flipEffect.slideShadows) {
            // Set shadows
            let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
          $slideEl
            .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, activeIndex, $wrapperEl } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          // eslint-disable-next-line
          slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;

            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      }
    }
  };

  constructor(public modalController: ModalController, private authService: AuthService, private recommendedIntakesService: RecommendedIntakeService,
    private consumedAmountService: ConsumedAmountService, private blogPostService: BlogPostService, private activityService: ActivityService,
    private appThemeService:AppThemeService, private renderer:Renderer2 ) { }

  ionViewWillEnter() {

    this.appThemeService.getloggedUserTheme(this.authService.logedUserID).subscribe(resData => {
      if (resData.theme == "dark") {
        this.renderer.setAttribute(document.body, 'color-theme', 'dark');
      } else {
        this.renderer.setAttribute(document.body, 'color-theme', 'light');
      }
    });

    this.blogPostService.getAllBlogPosts().subscribe(resData => {
    });

    this.getConsumedAmounts();
    //this.getActivities();
    this.getActivitiesPercentagesAndUdeos();

    //ovaj deo ispod treba prebaciti u ngOninit
    this.consumedAmountService.doesConsumedAmountForTodayExist().subscribe(resData => {
      if (resData == false) {
        console.log("Consumed amounts for loged user for today do not exist and therefore they will be added to database");
        this.consumedAmountService.addDefaultConsumedIntake(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.authService.logedUserID, new Date().toLocaleString()).subscribe(resData => {
        });
      }
    });

    this.activityService.doesActivityPercentageAndUdeoForLoggedUserForTodayExist().subscribe(resData => {
      if (resData == false) {
        console.log("Activities percentages and udeos do not exist for loged user for today and therefore they will be added to database");
        this.activityService.addActivityPercentageAndUdeo(0, 0, new Date().toLocaleString(), this.authService.logedUserID).subscribe(resData => {
        });
      }
    });
  }

  ngOnInit() {

    this.getActivities();

    this.blogPostService.blogPosts.subscribe(resData => {
      this.blogPosts = resData;
    });

    this.recommendedIntakesService.getRecommendedAmountsForLogedUser().subscribe(resData => {

      this.recommandedAmountOfWater = resData.recommendedAmountOfWater;
      this.recommandedHoursOfSleep = resData.recommendedAmountOfSleep;
      this.recommandedMindState = resData.recommendedMindState;

      this.recommandedAmountOfProtein = Math.round(resData.recommendedAmountOfProtein / 4);
      this.recommandedAmountOfFats = Math.round(resData.recommendedAmountOfFats / 9);
      this.recommandedAmountOfCarbs = Math.round(resData.recommendedAmountOfCarbs / 4);
    });
  }

  updateConsumedAmounts(consumedAmountOfWater: number, waterPercentage: number, waterUdeo: number,
    consumedAmountOfCalories: number,
    consumedAmountOfCarbs: number, carbsPercentage: number, carbsUdeo: number,
    consumedAmountOfProtein: number, proteinPercentage: number, proteinUdeo: number,
    consumedAmountOfFats: number, fatsPercentage: number, fatsUdeo: number,
    consumedAmountOfSleep: number, sleepPercentage: number, sleepUdeo: number,
    consumedAmountOfMindState: number, mindStatePercentage: number, mindStateUdeo: number,
    userId: string) {

    var consumedAmountOfLogedUserID;
    var dateFromDB;
    this.consumedAmountService.getTodaysConsumedAmountForLogedUser().subscribe(resData => {
      consumedAmountOfLogedUserID = resData.id;
      dateFromDB = resData.date;
      this.consumedAmountService.editConsumedIntake(consumedAmountOfLogedUserID,
        consumedAmountOfWater, waterPercentage, waterUdeo,
        consumedAmountOfCalories,
        consumedAmountOfCarbs, carbsPercentage, carbsUdeo,
        consumedAmountOfProtein, proteinPercentage, proteinUdeo,
        consumedAmountOfFats, fatsPercentage, fatsUdeo,
        consumedAmountOfSleep, sleepPercentage, sleepUdeo,
        consumedAmountOfMindState, mindStatePercentage, mindStateUdeo,
        userId, dateFromDB).subscribe(resData => {
          //console.log("updatovane vrednosti:");
          //console.log(resData);
        });

    });

  }

  updateActivitiesPercentagesAndUdeos(distancePercentage: number, distnaceUdeo: number, date: string, userId: string) {
    this.activityService.getActivityPercentageAndUdeoForLoggedUserForToday().subscribe(resData => {
      var id = resData.id;
      this.activityService.editActivityPercentageAndUdeo(id, distancePercentage, distnaceUdeo, date, userId).subscribe(resData => {
        
      });
    });
  }

  getConsumedAmounts() {
    this.consumedAmountService.getTodaysConsumedAmountForLogedUser().subscribe(resData => {
      if (resData != null) {
        this.drankAmountTotal = resData.consumedAmountOfWater;
        this.waterPercentage = resData.waterPercentage;
        this.waterUdeo = resData.waterUdeo;

        this.totalCaloriesConsumed = resData.consumedAmountOfCalories;

        this.totalProteinConsumed = resData.consumedAmountOfProtein;
        this.proteinPercentage = resData.proteinPercentage;
        this.proteinUdeo = resData.proteinUdeo;

        this.totalFatsConsumed = resData.consumedAmountOfFats;
        this.fatsPercentage = resData.fatsPercentage;
        this.fatsUdeo = resData.fatsUdeo;

        this.totalCarbsConsumed = resData.consumedAmountOfCarbs;
        this.carbsPercentage = resData.carbsPercentage;
        this.carbsUdeo = resData.carbsUdeo;

        this.totalTimeSlept = resData.consumedAmountOfSleep;
        this.sleepPercentage = resData.sleepPercentage;
        this.sleepUdeo = resData.sleepUdeo;

        this.totalHoursSlept = Math.floor(resData.consumedAmountOfSleep / 60);
        this.totalMinutesSlept = 60 * (resData.consumedAmountOfSleep / 60 - Math.floor(resData.consumedAmountOfSleep / 60))

        this.mindState = resData.consumedAmountOfMindState;
        this.mindStatePercentage = resData.mindStatePercentage;
        this.mindStateUdeo = resData.mindStateUdeo;

        this.updateConsumedAmounts(this.drankAmountTotal, this.waterPercentage, this.waterUdeo,
          this.totalCaloriesConsumed,
          this.totalCarbsConsumed, this.carbsPercentage, this.carbsUdeo,
          this.totalProteinConsumed, this.proteinPercentage, this.proteinUdeo,
          this.totalFatsConsumed, this.fatsPercentage, this.fatsUdeo,
          this.totalTimeSlept, this.sleepPercentage, this.sleepUdeo,
          this.mindState, this.mindStatePercentage, this.mindStateUdeo,
          this.authService.logedUserID);
      } else {
        this.drankAmountTotal = 0;
        this.waterPercentage = 0;
        this.waterUdeo = 0;

        this.totalCaloriesConsumed = 0;

        this.totalProteinConsumed = 0;
        this.proteinPercentage = 0;
        this.proteinUdeo = 0;

        this.totalFatsConsumed = 0;
        this.fatsPercentage = 0;
        this.fatsUdeo = 0;

        this.totalCarbsConsumed = 0;
        this.carbsPercentage = 0;
        this.carbsUdeo = 0;

        this.totalTimeSlept = 0;
        this.sleepPercentage = 0;
        this.sleepUdeo = 0;
        /////
        this.totalHoursSlept = 0;
        this.totalMinutesSlept = 0;
        ///////

        this.mindState = 0;
        this.mindStatePercentage = 0;
        this.mindStateUdeo = 0;
        console.log("Getovalo je null vrednosti");
        console.log(resData);
      }
    });
  }

  getActivities() {
    this.activityService.getAllActivitiesForLoggedUserForToday().subscribe(resData => {
      /*console.log("All distances/ACTIVITIES of loged user for today:");
      console.log(resData);*/
      if (resData.length != 0) {
        var desiredDistanceCumlative = 0;
        var distanceTraveledCumulative = 0;
        for (var i = 0; i < resData.length; i++) {

          var desiredDistanceCumlative = desiredDistanceCumlative + resData[i].desiredDistance;
          var x = +resData[i].distanceTraveled.substr(0, resData[i].distanceTraveled.indexOf(' '));
          distanceTraveledCumulative = distanceTraveledCumulative + x;
        }

        /*console.log("desiredDistanceCumlative");
        console.log(desiredDistanceCumlative);

        console.log("distanceTraveledCumulative");
        console.log(distanceTraveledCumulative);*/

        this.distancePercentage = Math.ceil(((distanceTraveledCumulative * 100) / desiredDistanceCumlative));
        this.distanceUdeo = this.distancePercentage / 100;

        this.updateActivitiesPercentagesAndUdeos(this.distancePercentage, this.distanceUdeo, new Date().toLocaleString(), this.authService.logedUserID);

      } else {
        this.distanceTraveled = "";
        this.distanceTraveledNumber = 0;
        this.desiredDistance = 0;
      }
    })
  }

  getActivitiesPercentagesAndUdeos() {
    this.activityService.getActivityPercentageAndUdeoForLoggedUserForToday().subscribe(resData => {
      if (resData != undefined) {
        this.distancePercentage = resData.distancePercentage;
        this.distanceUdeo = resData.distnaceUdeo;
      } else {
        //pozvace se samo jednom, kada baza za ulogovanog korsnika ne sadrzi ActivitiesPercentagesAndUdeos za danas
        this.distancePercentage = 0;
        this.distanceUdeo = 0;
        //this.updateActivitiesPercentagesAndUdeos(this.distancePercentage,this.distanceUdeo,new Date().toLocaleString(),this.authService.logedUserID);
      }
    })
  }

  async presentWaterModal() {
    this.getConsumedAmounts();
    const modal = await this.modalController.create({
      component: WaterTrackerPage,
      componentProps: {
        'recommanded_amount_of_water': this.recommandedAmountOfWater,
        'drank_amount_total': this.drankAmountTotal
      }
    });
    modal.present();

    return modal.onDidDismiss().then(
      (data: any) => {
        if (data.data.water_percentage != undefined) {
          this.drankAmountTotal = data.data.total_drank_amount;
          this.waterUdeo = data.data.water_udeo;
          this.waterPercentage = data.data.water_percentage;
          this.updateConsumedAmounts(this.drankAmountTotal, this.waterPercentage, this.waterUdeo,
            this.totalCaloriesConsumed,
            this.totalCarbsConsumed, this.carbsPercentage, this.carbsUdeo,
            this.totalProteinConsumed, this.proteinPercentage, this.proteinUdeo,
            this.totalFatsConsumed, this.fatsPercentage, this.fatsUdeo,
            this.totalTimeSlept, this.sleepPercentage, this.sleepUdeo,
            this.mindState, this.mindStatePercentage, this.mindStateUdeo,
            this.authService.logedUserID);
        }
      })
  }

  async presentFoodModal() {
    this.getConsumedAmounts();
    const modal = await this.modalController.create({
      component: FoodTrackerPage,
      componentProps: {
        'totalCaloriesConsumed': this.totalCaloriesConsumed,
        'recommandedAmountOfCarbs': this.recommandedAmountOfCarbs,
        'totalCarbsConsumed': this.totalCarbsConsumed,
        'recommandedAmountOfFats': this.recommandedAmountOfFats,
        'totalFatsConsumed': this.totalFatsConsumed,
        'recommandedAmountOfProtein': this.recommandedAmountOfProtein,
        'totalProteinConsumed': this.totalProteinConsumed,
      }
    });
    modal.present();

    return modal.onDidDismiss().then(
      (data: any) => {
        if (data.data.total_calories_consumed != undefined) {
          this.totalCaloriesConsumed = data.data.total_calories_consumed;
        }
        if (data.data.carbs_percentage != undefined) {
          this.totalCarbsConsumed = data.data.total_carbs_consumed;
          this.carbsUdeo = data.data.carbs_udeo;
          this.carbsPercentage = data.data.carbs_percentage;
        }
        if (data.data.fats_percentage != undefined) {
          this.totalFatsConsumed = data.data.total_fats_consumed;
          this.fatsUdeo = data.data.fats_udeo;
          this.fatsPercentage = data.data.fats_percentage;
        }
        if (data.data.protein_percentage != undefined) {
          this.totalProteinConsumed = data.data.total_protein_consumed;
          this.proteinUdeo = data.data.protein_udeo;
          this.proteinPercentage = data.data.protein_percentage;
        }
        this.updateConsumedAmounts(this.drankAmountTotal, this.waterPercentage, this.waterUdeo,
          this.totalCaloriesConsumed,
          this.totalCarbsConsumed, this.carbsPercentage, this.carbsUdeo,
          this.totalProteinConsumed, this.proteinPercentage, this.proteinUdeo,
          this.totalFatsConsumed, this.fatsPercentage, this.fatsUdeo,
          this.totalTimeSlept, this.sleepPercentage, this.sleepUdeo,
          this.mindState, this.mindStatePercentage, this.mindStateUdeo,
          this.authService.logedUserID);
      })
  }

  async presentSleepModal() {
    this.getConsumedAmounts();
    const modal = await this.modalController.create({
      component: SleepTrackerPage,
      componentProps: {
        'recommanded_hours_of_sleep': this.recommandedHoursOfSleep,
        'total_time_slept': this.totalTimeSlept,
        'total_hours_slept': this.totalHoursSlept,
        'total_minutes_slept': this.totalMinutesSlept,
        'condition': this.condition
      }
    });
    modal.present();

    return modal.onDidDismiss().then(
      (data: any) => {
        if (data.data.sleep_percentage != undefined) {
          this.totalTimeSlept = data.data.total_time_slept;
          this.totalHoursSlept = data.data.total_hours_slept;
          this.totalMinutesSlept = data.data.total_minutes_slept;
          this.sleepUdeo = data.data.sleep_udeo;
          this.sleepPercentage = data.data.sleep_percentage;
          this.condition = data.data.condition;
          this.updateConsumedAmounts(this.drankAmountTotal, this.waterPercentage, this.waterUdeo,
            this.totalCaloriesConsumed,
            this.totalCarbsConsumed, this.carbsPercentage, this.carbsUdeo,
            this.totalProteinConsumed, this.proteinPercentage, this.proteinUdeo,
            this.totalFatsConsumed, this.fatsPercentage, this.fatsUdeo,
            this.totalTimeSlept, this.sleepPercentage, this.sleepUdeo,
            this.mindState, this.mindStatePercentage, this.mindStateUdeo,
            this.authService.logedUserID);
        }
      })
  }

  async presentMoodModal() {
    this.getConsumedAmounts();
    const modal = await this.modalController.create({
      component: MoodTrackerPage,
      componentProps: {
        'recommandedhappy': this.recommandedhappy,
        'recommandedrested': this.recommandedrested,
        'recommandedhurt': this.recommandedhurt,
        'recommandedMindState': this.recommandedMindState,
        'happy': this.happy,
        'rested': this.rested,
        'hurt': this.hurt
      }
    });
    modal.present();

    return modal.onDidDismiss().then(
      (data: any) => {
        if (data.data.mindStatePercentage != undefined) {
          this.mindState = data.data.mindState;
          this.mindStatePercentage = data.data.mindStatePercentage;
          this.mindStateUdeo = data.data.mindStateUdeo;
          this.happy = data.data.happy;
          this.rested = data.data.rested;
          this.hurt = data.data.hurt;
          this.updateConsumedAmounts(this.drankAmountTotal, this.waterPercentage, this.waterUdeo,
            this.totalCaloriesConsumed,
            this.totalCarbsConsumed, this.carbsPercentage, this.carbsUdeo,
            this.totalProteinConsumed, this.proteinPercentage, this.proteinUdeo,
            this.totalFatsConsumed, this.fatsPercentage, this.fatsUdeo,
            this.totalTimeSlept, this.sleepPercentage, this.sleepUdeo,
            this.mindState, this.mindStatePercentage, this.mindStateUdeo,
            this.authService.logedUserID);
        }
      })
  }

  async presentActivityModal() {
    this.getConsumedAmounts();
    this.addActivityCondition = false;
    this.desiredDistance=0;
    this.distanceTraveled="";
    const modal = await this.modalController.create({
      component: ActivityTrackerPage,
      componentProps: {
        'desiredDistance': this.desiredDistance,
        'distanceTraveled': this.distanceTraveled,
        'addActivityCondition': this.addActivityCondition
      }
    });
    modal.present();
    return modal.onDidDismiss().then(
      (data: any) => {
        console.log("data na zatvaranju modala:");
        console.log(data);
        if (data.data.distanceTraveled != 0) {
          this.desiredDistance = data.data.desiredDistance;
          this.distanceTraveled = data.data.distanceTraveled;
          this.addActivityCondition = data.data.addActivityCondition;
          //
          if (this.addActivityCondition) {
            this.activityService.addActivity(this.desiredDistance, this.distanceTraveled, new Date().toLocaleString(), this.authService.logedUserID).subscribe(resData => {
              console.log("Aktivnost dodata:");
              console.log(resData);

              //console.log("pozivamo this.getActivities():");
              //console.log("pozivamo this.distanceTraveled:");
              //console.log(this.distanceTraveled);
              //console.log("pozivamo this.desiredDistance():");
              //console.log(this.desiredDistance);

              this.getActivities();

            });
          }
        }
      })
  }


}
