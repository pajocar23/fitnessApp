import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ConsumedAmount } from './consumedAmount.model';

interface consumedAmounts {
  id: string, 
  consumedAmountOfWater: number, waterPercentage: number, waterUdeo: number,
  consumedAmountOfCalories: number,
  consumedAmountOfCarbs: number, carbsPercentage: number, carbsUdeo: number,
  consumedAmountOfProtein: number, proteinPercentage: number, proteinUdeo: number,
  consumedAmountOfFats: number, fatsPercentage: number, fatsUdeo: number,
  consumedAmountOfSleep: number, sleepPercentage: number, sleepUdeo: number,
  consumedAmountOfMindState: number, mindStatePercentage: number, mindStateUdeo: number,
  userId: string, date: string
}

@Injectable({
  providedIn: 'root'
})
export class ConsumedAmountService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  addDefaultConsumedIntake(consumedAmountOfWater: number, waterPercentage: number, waterUdeo: number,
    consumedAmountOfCalories: number,
    consumedAmountOfCarbs: number, carbsPercentage: number, carbsUdeo: number,
    consumedAmountOfProtein: number, proteinPercentage: number, proteinUdeo: number,
    consumedAmountOfFats: number, fatsPercentage: number, fatsUdeo: number,
    consumedAmountOfSleep: number, sleepPercentage: number, sleepUdeo: number,
    consumedAmountOfMindState: number, mindStatePercentage: number, mindStateUdeo: number,
    userId: string, date: string) {
    return this.http.post<{ name: string }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userConsumedAmounts.json`,
      {
        consumedAmountOfWater, waterPercentage, waterUdeo,
        consumedAmountOfCalories,
        consumedAmountOfCarbs, carbsPercentage, carbsUdeo,
        consumedAmountOfProtein, proteinPercentage, proteinUdeo,
        consumedAmountOfFats, fatsPercentage, fatsUdeo,
        consumedAmountOfSleep, sleepPercentage, sleepUdeo,
        consumedAmountOfMindState, mindStatePercentage, mindStateUdeo,
        userId, date
      });
  }

  editConsumedIntake(id: string, consumedAmountOfWater: number, waterPercentage: number, waterUdeo: number,
    consumedAmountOfCalories: number,
    consumedAmountOfCarbs: number, carbsPercentage: number, carbsUdeo: number,
    consumedAmountOfProtein: number, proteinPercentage: number, proteinUdeo: number,
    consumedAmountOfFats: number, fatsPercentage: number, fatsUdeo: number,
    consumedAmountOfSleep: number, sleepPercentage: number, sleepUdeo: number,
    consumedAmountOfMindState: number, mindStatePercentage: number, mindStateUdeo: number,
    userId: string, date: string) {
    return this.http.put(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userConsumedAmounts/${id}.json`,
      {
        consumedAmountOfWater, waterPercentage, waterUdeo,
        consumedAmountOfCalories,
        consumedAmountOfCarbs, carbsPercentage, carbsUdeo,
        consumedAmountOfProtein, proteinPercentage, proteinUdeo,
        consumedAmountOfFats, fatsPercentage, fatsUdeo,
        consumedAmountOfSleep, sleepPercentage, sleepUdeo,
        consumedAmountOfMindState, mindStatePercentage, mindStateUdeo,
        userId, date
      });
  }

  getTodaysConsumedAmountForLogedUser() {
    return this.http.get<{ [key: string]: consumedAmounts }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userConsumedAmounts.json`)
      .pipe(map((consumedAmountsData) => {

        const consumedAmounts: ConsumedAmount[] = [];
        var consumedAmountsForLogedUser: ConsumedAmount;

        for (const key in consumedAmountsData) {
          if (consumedAmountsData.hasOwnProperty(key)) {
            consumedAmounts.push({
              id: key,
              consumedAmountOfWater: consumedAmountsData[key].consumedAmountOfWater,
              waterPercentage:consumedAmountsData[key].waterPercentage,
              waterUdeo:consumedAmountsData[key].waterUdeo,

              consumedAmountOfCalories: consumedAmountsData[key].consumedAmountOfCalories,

              consumedAmountOfCarbs: consumedAmountsData[key].consumedAmountOfCarbs,
              carbsPercentage:consumedAmountsData[key].carbsPercentage,
              carbsUdeo:consumedAmountsData[key].carbsUdeo,

              consumedAmountOfProtein: consumedAmountsData[key].consumedAmountOfProtein,
              proteinPercentage:consumedAmountsData[key].proteinPercentage,
              proteinUdeo:consumedAmountsData[key].proteinUdeo,  

              consumedAmountOfFats: consumedAmountsData[key].consumedAmountOfFats,
              fatsPercentage:consumedAmountsData[key].fatsPercentage,
              fatsUdeo:consumedAmountsData[key].fatsUdeo,  

              consumedAmountOfSleep: consumedAmountsData[key].consumedAmountOfSleep,
              sleepPercentage:consumedAmountsData[key].sleepPercentage,
              sleepUdeo:consumedAmountsData[key].sleepUdeo,

              consumedAmountOfMindState: consumedAmountsData[key].consumedAmountOfMindState,
              mindStatePercentage:consumedAmountsData[key].mindStatePercentage,
              mindStateUdeo:consumedAmountsData[key].mindStateUdeo,

              userId: consumedAmountsData[key].userId,
              date: consumedAmountsData[key].date
            });
          }
        }

        for (var i = 0; i < consumedAmounts.length; i++) {
          if (consumedAmounts[i].userId == this.authService._logedUserID) {
            consumedAmountsForLogedUser = consumedAmounts[i];
          }
        }

        return consumedAmountsForLogedUser;


      }));
  }

  doesConsumedAmountForTodayExist() {
    return this.http.get<{ [key: string]: consumedAmounts }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userConsumedAmounts.json`)
      .pipe(map((consumedAmountsData) => {

        const consumedAmounts: ConsumedAmount[] = [];
        var consumedAmountsForLogedUser: ConsumedAmount[] = [];
        var alreadyExists = false;

        for (const key in consumedAmountsData) {
          if (consumedAmountsData.hasOwnProperty(key)) {
            consumedAmounts.push({
              id: key,
              consumedAmountOfWater: consumedAmountsData[key].consumedAmountOfWater,
              waterPercentage:consumedAmountsData[key].waterPercentage,
              waterUdeo:consumedAmountsData[key].waterUdeo,

              consumedAmountOfCalories: consumedAmountsData[key].consumedAmountOfCalories,

              consumedAmountOfCarbs: consumedAmountsData[key].consumedAmountOfCarbs,
              carbsPercentage:consumedAmountsData[key].carbsPercentage,
              carbsUdeo:consumedAmountsData[key].carbsUdeo,

              consumedAmountOfProtein: consumedAmountsData[key].consumedAmountOfProtein,
              proteinPercentage:consumedAmountsData[key].proteinPercentage,
              proteinUdeo:consumedAmountsData[key].proteinUdeo,  

              consumedAmountOfFats: consumedAmountsData[key].consumedAmountOfFats,
              fatsPercentage:consumedAmountsData[key].fatsPercentage,
              fatsUdeo:consumedAmountsData[key].fatsUdeo,  

              consumedAmountOfSleep: consumedAmountsData[key].consumedAmountOfSleep,
              sleepPercentage:consumedAmountsData[key].sleepPercentage,
              sleepUdeo:consumedAmountsData[key].sleepUdeo,

              consumedAmountOfMindState: consumedAmountsData[key].consumedAmountOfMindState,
              mindStatePercentage:consumedAmountsData[key].mindStatePercentage,
              mindStateUdeo:consumedAmountsData[key].mindStateUdeo,

              userId: consumedAmountsData[key].userId,
              date: consumedAmountsData[key].date
            });
          }
        }

        for (var i = 0; i < consumedAmounts.length; i++) {
          if (consumedAmounts[i].userId == this.authService._logedUserID) {
            consumedAmountsForLogedUser.push(consumedAmounts[i]);
          }
        }

        for (var i = 0; i < consumedAmountsForLogedUser.length; i++) {
          //mesec pa dan pa (godina i vreme kojoj smo stripovali vreme)
          var dateElements1 = consumedAmountsForLogedUser[i].date.split("/", 3);
          dateElements1[2] = dateElements1[2].substr(0, dateElements1[2].indexOf(","));

          var dateElements2 = new Date().toLocaleString().split("/", 3);
          dateElements2[2] = dateElements2[2].substr(0, dateElements2[2].indexOf(","));

          for (var i = 0; i < 3; i++) {
            if (dateElements1[i] != dateElements2[i]) {
              alreadyExists = false;
            }
          }
          alreadyExists = true;
        }

        return alreadyExists;

      }));
  }


}
