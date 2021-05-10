import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivityTrackerComponent } from 'src/app/activity-tracker/activity-tracker.component';
import { FoodTrackerComponent } from 'src/app/food-tracker/food-tracker.component';
import { MoodTrackerComponent } from 'src/app/mood-tracker/mood-tracker.component';
import { SleepTrackerComponent } from 'src/app/sleep-tracker/sleep-tracker.component';
import { WaterTrackerComponent } from 'src/app/water-tracker/water-tracker.component';
import { BlogPost } from './blog-post.model';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  blogPosts:BlogPost[]=[{id:'1',heading:'water fact',description:'water makes 69% of human body',imageUrl:'https://media3.s-nbcnews.com/i/newscms/2017_15/1206634/woman-drinking-water-tease-today-170410_bb7df024651d415ac135bfaf31c4f819.jpg'},
  {id:'2',heading:'food fact',description:'without food you dead BOi',imageUrl:'https://i.pinimg.com/originals/a8/cd/aa/a8cdaa791eef42e15067426d08a566b0.jpg'},
  {id:'3',heading:'sleep fact',description:'If you watch monitor that emmits blue light before going to sleep, your endorphine poroduction is decreased and therefore you cant sleep well',imageUrl:'https://lh3.googleusercontent.com/proxy/bR8GSuknsVaxaewOI6qeH8J1zY3qjLVDbz7tg3BXofKrSYVfz9VTzARsCF6KOTFpri43g0Fb5nGQ-CPHFU70gFpqFM9f_Cfz60wn0nLbjc2OgpHn0sGf9VLGWXIr7GrvsR6CVzgcLh3BpoPRtmQgKiCl'}]
 

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
     component: WaterTrackerComponent
   });
   return await modal.present();
 }

 async presentFoodModal() {
   const modal = await this.modalController.create({
     component: FoodTrackerComponent
   });
   return await modal.present();
 }

 async presentSleepModal() {
   const modal = await this.modalController.create({
     component: SleepTrackerComponent
   });
   return await modal.present();
 }

 async presentMoodModal() {
   const modal = await this.modalController.create({
     component: MoodTrackerComponent
   });
   return await modal.present();
 }

 async presentActivityModal() {
   const modal = await this.modalController.create({
     component: ActivityTrackerComponent
   });
   return await modal.present();
 }


}
