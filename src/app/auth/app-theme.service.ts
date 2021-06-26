import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

interface userThemeData {
  id: string;
  theme: string;
  userId: string; //spoljni kljuc ka tabeli korisnika
}

@Injectable({
  providedIn: 'root'
})
export class AppThemeService {

  constructor(private authService: AuthService, private http: HttpClient) { }


  addTheme(theme: string, userId: string) {
    return this.authService.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.post<{ name: string }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userThemes.json?auth=${token}`,
          { theme, userId });
      }));
  }

  getloggedUserTheme(userId: string) {
    // return this.http.get<{ [key: string]: userMetricsData }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userMetrics.json`);
    return this.authService.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: userThemeData }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userThemes.json?auth=${token}`);
      }),
      map((userThemeData) => {
        console.log("userThemeData");
        console.log(userThemeData);

        const _userThemeData: userThemeData[] = [];
        var _userThemeDataLoggedUser: userThemeData;

        //public name: string,public surname: string,public age: number,public gender: string,public height: string,public weight: string,public bodyType: string,public activityLevel: string,public goal: string,public userId: string
        for (const key in userThemeData) {
          if (userThemeData.hasOwnProperty(key)) {
            _userThemeData.push({
              id: key,
              theme: userThemeData[key].theme,
              userId: userThemeData[key].userId
            });
          }
        };

        //console.log("usersMetricsData");
        //console.log(usersMetricsData);

        for (var i = 0; i < _userThemeData.length; i++) {
          if (_userThemeData[i].userId == userId) {
            _userThemeDataLoggedUser = _userThemeData[i];
          }
        }

        return _userThemeDataLoggedUser;
      }));
  }

  updateLoggedUserTheme(id: string, theme: string, userId: string) {
    return this.authService.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.put(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userThemes/${id}.json?auth=${token}`,
          { theme, userId });
      }));
  }

}