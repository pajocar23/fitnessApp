import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { userMetrics } from './user-data/userMetrics.model';

interface userMetricsData {
  name: string;
  surname: string;
  age: number;
  gender: string;
  height: string;
  weight: string;
  bodyType: string;
  activityLevel: string;
  goal: string;
  //dodati deo za avatara posle
  userId: string; //spoljni kljuc ka tabeli korisnika
}

@Injectable({
  providedIn: 'root'
})
export class UserMetricsService {

  _localUserId: string; //setuje se prilikom registracije

  constructor(private http: HttpClient,private auth:AuthService) { }

  get localUserId(): string {
    return this._localUserId;
  }

  addUserMetrics(name: string, surname: string, age: number, gender: string, height: string, weight: string, bodyType: string, activityLevel: string, goal: string, userId: string) {
     
    return this.auth.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.post<{ name: string }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userMetrics.json?auth=${token}`,
        { name, surname, age, gender, height, weight, bodyType, activityLevel, goal, userId });
      }));

  }

  getUsersMetrics() {
    // return this.http.get<{ [key: string]: userMetricsData }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userMetrics.json`);
    return this.auth.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: userMetricsData }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userMetrics.json?auth=${token}`);
      }),
      map((userMetricsData) => {

        const usersMetricsData: userMetrics[] = [];
        //public name: string,public surname: string,public age: number,public gender: string,public height: string,public weight: string,public bodyType: string,public activityLevel: string,public goal: string,public userId: string
        for (const key in usersMetricsData) {
          if (userMetricsData.hasOwnProperty(key)) {
            usersMetricsData.push({
              name: userMetricsData[key].name,
              surname: userMetricsData[key].surname,
              age: userMetricsData[key].age,
              gender:userMetricsData[key].gender,
              height: userMetricsData[key].height,
              weight: userMetricsData[key].weight,
              bodyType:userMetricsData[key].bodyType,
              activityLevel: userMetricsData[key].activityLevel,
              goal: userMetricsData[key].goal,
              userId: userMetricsData[key].userId
            });
          }
        };
        return usersMetricsData;
      }));
  }

}
