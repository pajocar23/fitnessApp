import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivityTrackerPage } from 'src/app/trackers/activity-tracker/activity-tracker.page';
import { FoodTrackerPage } from 'src/app/trackers/food-tracker/food-tracker.page';
import { MoodTrackerPage } from 'src/app/trackers/mood-tracker/mood-tracker.page';
import { SleepTrackerPage } from 'src/app/trackers/sleep-tracker/sleep-tracker.page';
import { WaterTrackerPage } from 'src/app/trackers/water-tracker/water-tracker.page';

import { BlogPost } from './blog-post.model';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  //water tracker data
  recommandedAmountOfWater: number = 10;
  drankAmountTotal: number = 0;
  waterUdeo: number = 0;
  waterPercentage: number = 0;

  //food tracker data
  totalCaloriesConsumed: number = 0;

  recommandedAmountOfCarbs: number = 200;
  totalCarbsConsumed: number = 0;
  carbsPercentage: number = 0;
  carbsUdeo: number = 0;

  recommandedAmountOfFats: number = 150;
  totalFatsConsumed: number = 0;
  fatsPercentage: number = 0;
  fatsUdeo: number = 0;

  recommandedAmountOfProtein: number = 200;
  totalProteinConsumed: number = 0;
  proteinPercentage: number = 0;
  proteinUdeo: number = 0;

  //sleep tracker data
  recommandedHoursOfSleep: number = 8; //minutes
  totalTimeSlept:number=0;
  totalHoursSlept:number=0;
  totalMinutesSlept:number=0;
  sleepPercentage:number=0;
  sleepUdeo:number=0;
  condition:boolean=true;

  //mood tracker data
  recommandedhappy: number = 100;
  recommandedrested: number = 100;
  recommandedhurt: number = 0;

  recommandedMindState:number=100
  mindState:number=0;
  mindStatePercentage:number=0;
  mindStateUdeo:number=0;

  happy:number=0;
  rested:number=0;
  hurt:number=0;

  blogPosts: BlogPost[] = [{ id: '1', heading: 'water fact', description: 'water makes 70% of human body', imageUrl: 'https://media3.s-nbcnews.com/i/newscms/2017_15/1206634/woman-drinking-water-tease-today-170410_bb7df024651d415ac135bfaf31c4f819.jpg' },
  { id: '2', heading: 'food fact', description: 'without food you dead BOi', imageUrl: 'https://i.pinimg.com/originals/a8/cd/aa/a8cdaa791eef42e15067426d08a566b0.jpg' },
  { id: '3', heading: 'sleep fact', description: 'If you watch monitor that emmits blue light before going to sleep, your endorphine poroduction is decreased and therefore you cant sleep well', imageUrl: 'https://media.gq.com/photos/5e617d866ad6c200080c3f7d/16:9/w_1839,h_1034,c_limit/gq%20march%202020%20Is%20my%20screen-based%20lifestyle%20ruining%20my%20vision?%20.jpg' }]


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

  constructor(public modalController: ModalController) { }

  ngOnInit() {

  }

  async presentWaterModal() {
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
        if (data.data.water_percentage!= undefined) {
          this.drankAmountTotal = data.data.total_drank_amount;
          this.waterUdeo = data.data.water_udeo;
          this.waterPercentage = data.data.water_percentage;
        }
      })
  }

  async presentFoodModal() {
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
      })
  }

  async presentSleepModal() {
    const modal = await this.modalController.create({
      component: SleepTrackerPage,
      componentProps: {
        'recommanded_hours_of_sleep': this.recommandedHoursOfSleep,
        'total_time_slept':this.totalTimeSlept,
        'total_hours_slept':this.totalHoursSlept,
        'total_minutes_slept':this.totalMinutesSlept,
        'condition':this.condition
      }
    });
    modal.present();

    return modal.onDidDismiss().then(
      (data: any) => {
        if (data.data.sleep_percentage!=undefined) {
          this.totalTimeSlept=data.data.total_time_slept;
          this.totalHoursSlept=data.data.total_hours_slept;
          this.totalMinutesSlept=data.data.total_minutes_slept;
          this.sleepUdeo=data.data.sleep_udeo;
          this.sleepPercentage=data.data.sleep_percentage;
          this.condition=data.data.condition;
        }
      })
  }

  async presentMoodModal() {
    const modal = await this.modalController.create({
      component: MoodTrackerPage,
      componentProps: {
        'recommandedhappy':this.recommandedhappy,
        'recommandedrested':this.recommandedrested,
        'recommandedhurt':this.recommandedhurt,
        'recommandedMindState':this.recommandedMindState,
        'happy':this.happy,
        'rested':this.rested,
        'hurt':this.hurt
      }
    });
    modal.present();

    return modal.onDidDismiss().then(
      (data: any) => {
        if (data.data.mindStatePercentage!=undefined) {
          this.mindState=data.data.mindState;
          this.mindStatePercentage=data.data.mindStatePercentage;
          this.mindStateUdeo=data.data.mindStateUdeo;
          this.happy=data.data.happy;
          this.rested=data.data.rested;
          this.hurt=data.data.hurt;
        }
      })
  }

  async presentActivityModal() {
    const modal = await this.modalController.create({
      component: ActivityTrackerPage
    });
    return await modal.present();
  }


}
