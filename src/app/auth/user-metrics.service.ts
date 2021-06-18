import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) { }

  get localUserId(): string {
    return this._localUserId;
  }

  addUserMetrics(name: string, surname: string, age: number, gender: string, height: string, weight: string, bodyType: string, activityLevel: string, goal: string, userId: string) {
      console.log("id je:" + userId);
      return this.http.post<{ name: string }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userMetrics.json`,
        { name, surname, age, gender, height, weight, bodyType, activityLevel, goal, userId });
  }

  getUsersMetrics() {
    return this.http.get<{ [key: string]: userMetricsData }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userMetrics.json`);
  }

}
