import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

interface Activity {
  id: string;
  desiredDistance: number;
  distanceTraveled: string;
  date: string;
  userId: string;
}

interface ActivityPercentageAndUdeo {
  id: string;
  distancePercentage: number;
  distnaceUdeo: number;
  date: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  //moze biti vise aktivnosti za jednog usera za jedan datum(jedan dan)
  //voditi racuna o tome
  //pitanje ? kako racunati procenat i udeo onda
  // tako sto se svi desired distanci saberu i vidi se koliko je posto od toga, svi predjeni distani
  addActivity(desiredDistance: number, distanceTraveled: string, date: string, userId: string) {
    return this.authService.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.post<{ name: string }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/activity.json?auth=${token}`,
          { desiredDistance, distanceTraveled, date, userId });
      }));
  }

  addActivityPercentageAndUdeo(distancePercentage: number, distnaceUdeo: number, date: string, userId: string) {
    return this.authService.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.post<{ name: string }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/activityPercentageAndUdeo.json?auth=${token}`,
          { distancePercentage, distnaceUdeo, date, userId });
      }));
  }

  editActivity(id: string, desiredDistance: number, distanceTraveled: string, userId: string) {
    return this.authService.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.put(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/activity/${id}.json?auth=${token}`,
          { desiredDistance, distanceTraveled, userId });
      }));
  }

  editActivityPercentageAndUdeo(id: string, distancePercentage: number, distnaceUdeo: number, date: string, userId: string) {
    return this.authService.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.put(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/activityPercentageAndUdeo/${id}.json?auth=${token}`,
          { distancePercentage, distnaceUdeo, date, userId });
      }));
  }

  getAllActivitiesForLoggedUserForToday() {
    return this.authService.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: Activity }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/activity.json?auth=${token}`);
      }),
      map((allActivitiesData) => {
        const allActivities: Activity[] = [];
        var allActivitiesForLogedUser: Activity[] = [];
        var allActivitiesForLogedUserForToday: Activity[] = [];

        for (const key in allActivitiesData) {
          if (allActivitiesData.hasOwnProperty(key)) {
            allActivities.push({
              id: key,
              desiredDistance: allActivitiesData[key].desiredDistance,
              distanceTraveled: allActivitiesData[key].distanceTraveled,
              date: allActivitiesData[key].date,
              userId: allActivitiesData[key].userId,
            });
          }
        }

        for (var i = 0; i < allActivities.length; i++) {
          if (allActivities[i].userId == this.authService._logedUserID) {
            allActivitiesForLogedUser.push(allActivities[i]);
          }
        }

        for (var i = 0; i < allActivitiesForLogedUser.length; i++) {
          //mesec pa dan pa (godina i vreme kojoj smo stripovali vreme)
          var dateElements1 = allActivitiesForLogedUser[i].date.split("/", 3);
          dateElements1[2] = dateElements1[2].substr(0, dateElements1[2].indexOf(","));

          var dateElements2 = new Date().toLocaleString().split("/", 3);
          dateElements2[2] = dateElements2[2].substr(0, dateElements2[2].indexOf(","));

          if (JSON.stringify(dateElements1) === JSON.stringify(dateElements2)) {
            //console.log("NADJEN JE DANASNJI DATUM ZA TRENUTNO ULOGOVANOG KORISNIKA");
            allActivitiesForLogedUserForToday.push(allActivitiesForLogedUser[i]);
          }
        }

        return allActivitiesForLogedUserForToday;
      }));


  }

  getActivityPercentageAndUdeoForLoggedUserForToday() {
    return this.authService.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: ActivityPercentageAndUdeo }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/activityPercentageAndUdeo.json?auth=${token}`);
      }),
      map((activityPercentageAndUdeoData) => {

        const allActivitiesPercentageAndUdeo: ActivityPercentageAndUdeo[] = [];
        var allActivitiesPercentageAndUdeoForLoggedUser: ActivityPercentageAndUdeo[] = [];
        var allActivitiesPercentageAndUdeoForLoggedUserForToday: ActivityPercentageAndUdeo;

        for (const key in activityPercentageAndUdeoData) {
          if (activityPercentageAndUdeoData.hasOwnProperty(key)) {
            allActivitiesPercentageAndUdeo.push({
              id: key,
              distancePercentage: activityPercentageAndUdeoData[key].distancePercentage,
              distnaceUdeo: activityPercentageAndUdeoData[key].distnaceUdeo,
              date: activityPercentageAndUdeoData[key].date,
              userId: activityPercentageAndUdeoData[key].userId,
            });
          }
        }

        //console.log("allActivitiesPercentageAndUdeo");
        //console.log(allActivitiesPercentageAndUdeo);

        for (var i = 0; i < allActivitiesPercentageAndUdeo.length; i++) {
          if (allActivitiesPercentageAndUdeo[i].userId == this.authService._logedUserID) {
            allActivitiesPercentageAndUdeoForLoggedUser.push(allActivitiesPercentageAndUdeo[i]);
          }
        }

        // console.log("allActivitiesPercentageAndUdeoForLoggedUser");
        // console.log(allActivitiesPercentageAndUdeoForLoggedUser);

        for (var i = 0; i < allActivitiesPercentageAndUdeoForLoggedUser.length; i++) {
          //mesec pa dan pa (godina i vreme kojoj smo stripovali vreme)
          var dateElements1 = allActivitiesPercentageAndUdeoForLoggedUser[i].date.split("/", 3);
          dateElements1[2] = dateElements1[2].substr(0, dateElements1[2].indexOf(","));

          var dateElements2 = new Date().toLocaleString().split("/", 3);
          dateElements2[2] = dateElements2[2].substr(0, dateElements2[2].indexOf(","));

          /*console.log(i+" dateElements2");
          console.log(dateElements2);

          console.log("JSON.stringify(dateElements1");
          console.log(JSON.stringify(dateElements1));

          console.log("JSON.stringify(dateElements2)");
          console.log(JSON.stringify(dateElements2));*/

          if (JSON.stringify(dateElements1) === JSON.stringify(dateElements2)) {
            //console.log("NADJEN JE DANASNJI DATUM ZA TRENUTNO ULOGOVANOG KORISNIKA");
            allActivitiesPercentageAndUdeoForLoggedUserForToday = allActivitiesPercentageAndUdeoForLoggedUser[i];
            break;
          }
        }

        return allActivitiesPercentageAndUdeoForLoggedUserForToday;

      }));
  }

  doesActivityPercentageAndUdeoForLoggedUserForTodayExist() {
    return this.authService.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: ActivityPercentageAndUdeo }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/activityPercentageAndUdeo.json?auth=${token}`);
      }),
      map((activityPercentageAndUdeoData) => {

        const allActivitiesPercentageAndUdeo: ActivityPercentageAndUdeo[] = [];
        var allActivitiesPercentageAndUdeoForLoggedUser: ActivityPercentageAndUdeo[] = [];
        var alreadyExists = false;

        for (const key in activityPercentageAndUdeoData) {
          if (activityPercentageAndUdeoData.hasOwnProperty(key)) {
            allActivitiesPercentageAndUdeo.push({
              id: key,
              distancePercentage: activityPercentageAndUdeoData[key].distancePercentage,
              distnaceUdeo: activityPercentageAndUdeoData[key].distnaceUdeo,
              date: activityPercentageAndUdeoData[key].date,
              userId: activityPercentageAndUdeoData[key].userId,
            });
          }
        }

        //console.log("consumedAmounts for all users");
        //console.log(consumedAmounts);

        for (var i = 0; i < allActivitiesPercentageAndUdeo.length; i++) {
          if (allActivitiesPercentageAndUdeo[i].userId == this.authService._logedUserID) {
            allActivitiesPercentageAndUdeoForLoggedUser.push(allActivitiesPercentageAndUdeo[i]);
          }
        }

        //console.log("consumedAmounts for loged user");
        //console.log(consumedAmountsForLogedUser);

        for (var i = 0; i < allActivitiesPercentageAndUdeoForLoggedUser.length; i++) {
          //mesec pa dan pa (godina i vreme kojoj smo stripovali vreme)
          var dateElements1 = allActivitiesPercentageAndUdeoForLoggedUser[i].date.split("/", 3);
          dateElements1[2] = dateElements1[2].substr(0, dateElements1[2].indexOf(","));

          var dateElements2 = new Date().toLocaleString().split("/", 3);
          dateElements2[2] = dateElements2[2].substr(0, dateElements2[2].indexOf(","));

          /*console.log(i+" dateElements2");
          console.log(dateElements2);

          console.log("JSON.stringify(dateElements1");
          console.log(JSON.stringify(dateElements1));

          console.log("JSON.stringify(dateElements2)");
          console.log(JSON.stringify(dateElements2));*/

          if (JSON.stringify(dateElements1) === JSON.stringify(dateElements2)) {
            //console.log("NADJEN JE DANASNJI DATUM ZA TRENUTNO ULOGOVANOG KORISNIKA");
            alreadyExists = true;
            break;
          } else {
            alreadyExists = false;
          }
        }

        return alreadyExists;

      }));
  }








}
