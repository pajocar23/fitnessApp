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
  imageUrl:string;
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

  addUserMetrics(name: string, surname: string, age: number, gender: string, height: string, weight: string, bodyType: string, activityLevel: string, goal: string, userId: string,imageUrl:string) {
     
    return this.auth.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.post<{ name: string }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userMetrics.json?auth=${token}`,
        { name, surname, age, gender, height, weight, bodyType, activityLevel, goal, userId, imageUrl });
      }));

  }

  getLoggedUserMetrics(userId:string) {
    // return this.http.get<{ [key: string]: userMetricsData }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userMetrics.json`);
    return this.auth.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: userMetricsData }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userMetrics.json?auth=${token}`);
      }),
      map((_usersMetricsData) => {
        console.log("userMetricsData");
        console.log(_usersMetricsData);

        const usersMetricsData: userMetrics[] = [];
        var metricsForLoggedUser:userMetrics;
        
        //public name: string,public surname: string,public age: number,public gender: string,public height: string,public weight: string,public bodyType: string,public activityLevel: string,public goal: string,public userId: string
        for (const key in _usersMetricsData) {
          if (_usersMetricsData.hasOwnProperty(key)) {
            usersMetricsData.push({
              name: _usersMetricsData[key].name,
              surname: _usersMetricsData[key].surname,
              age: _usersMetricsData[key].age,
              gender:_usersMetricsData[key].gender,
              height: _usersMetricsData[key].height,
              weight: _usersMetricsData[key].weight,
              bodyType:_usersMetricsData[key].bodyType,
              activityLevel: _usersMetricsData[key].activityLevel,
              goal: _usersMetricsData[key].goal,
              userId: _usersMetricsData[key].userId,
              imageUrl:_usersMetricsData[key].imageUrl
            });
          }
        };

        //console.log("usersMetricsData");
        //console.log(usersMetricsData);

        for(var i=0;i<usersMetricsData.length;i++){
          if(usersMetricsData[i].userId==userId){
            metricsForLoggedUser=usersMetricsData[i];
          }
        }

        return metricsForLoggedUser;
      }));
  }

}
