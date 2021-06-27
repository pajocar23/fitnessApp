import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { switchMap, take, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Md5 } from "md5-typescript";
import { logedInUserDataRTDB } from './logedInUserDataRTDB.model';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

interface adminStatusData {
  id: string;
  userIsAdmin: boolean;
  userId: string; 
}

interface UserData {
  email: string;
  password: string;
}

interface regedUserDataRTDB {
  id: string,
  email: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isUserAuthenticated = false
  private _isRegistered = false
  private _isUserAdmin = true
  _logedUserID = ""; //setuje se kad se korisnik loginuje

  //ova dva parametra ce se setovati u formi za registraciju, a prosledice se u bazi nakon sto se unesu metrike
  //ove se radi kako bi se izbeglo da se prvo u bazu unesu email i sifra, a ako se izadje iz aplikacije, taj email i ta sifra su vec uneti
  //i ne moze se sa tim mailom pristupiti stranici za popunjavanje metrika
  _email: string;
  _password: string;

  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  get loggedUserId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  get loggedUserToken() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }


  get email() {
    return this._email;
  }

  get logedUserID() {
    return this._logedUserID;
  }

  get password() {
    return this._password;
  }

  get isUserAuthenticated() {
    //return this._isUserAuthenticated;
    return this._user.asObservable().pipe(
      map((user: User) => {
        if (user) {
          console.log("user true:");
          console.log(user);
          this._isUserAuthenticated=true;
          return !!user.token;
        } else {
          console.log("user false:");
          console.log(user);
          this._isUserAuthenticated=false;
          return false;      
        }
      })
    );
  }


  get isRegistered(): boolean {
    return this._isRegistered;
  }

  get isUserAdmin(): boolean {
    return this._isUserAdmin;
  }

  userIsAdmin() {
    this._isUserAdmin = true;
  }

  userIsNotAdmin() {
    this._isUserAdmin = false;
  }

  setIsRegisteredToTrue() { //ako klikne register na formi za registrovanje
    this._isRegistered = true;
  }

  register(user: UserData) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
      { email: user.email, password: user.password, returnSecureToken: true })
      .pipe(
        tap((userData: AuthResponseData) => {
          const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000);
          const user = new User(userData.localId, userData.email, userData.idToken, expirationTime);
          this._user.next(user);
        })
      );
  }

  addRegisteredUserToRTDB(id: string, email: string) {
    return this.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.post<{ name: string }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/registeredUsers.json?auth=${token}`,
          { id: id, email: email });
      }));
  }

  getAllRegisteredUsersFromRTDB() {
    return this.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: regedUserDataRTDB }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/registeredUsers.json?auth=${token}`);
      }),
      map((data) => {
        //console.log("data");
        //console.log(data);
        var regedUsers: regedUserDataRTDB[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            regedUsers.push({
              id: key,
              email: data[key].email
            });
          }
        }
        return regedUsers;
      }));
  }

  setAdminStatus(userIsAdmin: boolean, userId: string) {
    return this.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.post<{ name: string }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userAdminStatus.json?auth=${token}`,
          { userIsAdmin, userId });
      }));
  }

  isLogedUserAdmin() {
    return this.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: adminStatusData }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userAdminStatus.json?auth=${token}`);
      }),
      map((adminStatusData) => {
        const _admiStatusData: adminStatusData[] = [];
        var isUserAdmin: boolean = false;

        for (const key in adminStatusData) {
          if (adminStatusData.hasOwnProperty(key)) {
            _admiStatusData.push({
              id: key,
              userIsAdmin: adminStatusData[key].userIsAdmin,
              userId: adminStatusData[key].userId
            });
          }
        }

        for (var i = 0; i < _admiStatusData.length; i++) {
          if (_admiStatusData[i].userId == this._logedUserID) {
            isUserAdmin = _admiStatusData[i].userIsAdmin;
          }
        }

        return isUserAdmin;

      }));

  }

  login(user: UserData) {
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
      { email: user.email, password: user.password, returnSecureToken: true })
      .pipe(
        tap((userData: AuthResponseData) => {
          const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000);
          const user = new User(userData.localId, userData.email, userData.idToken, expirationTime);
          this._user.next(user);
        })
      );
  }

  /*addLogedInUserToRTDB(userId: string, email: string) {
    return this.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.post<{ name: string }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/logedInUsers.json?auth=${token}`,
          { userId: userId, email: email });
      }));
  }*/

  /*getIDForLogOut(users_id: string) {
    return this.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: logedInUserDataRTDB }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/logedInUsers.json?auth=${token}`);
      }),
      map((data) => {
        var logedUsers: logedInUserDataRTDB[] = [];
        var idForDeletion;
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            logedUsers.push({
              id: key,
              userId: data[key].userId,
              email: data[key].email
            });
          }
        }

        for (var i = 0; i < logedUsers.length; i++) {
          if (logedUsers[i].userId == users_id) {
            idForDeletion = logedUsers[i].id;
          }
        }
        console.log("idForDeletion");
        console.log(idForDeletion);
        return idForDeletion;
      }));
  }*/

  /*removeLogedInUserFromRTDB(users_id: string) {
    var id;
    this.getIDForLogOut(users_id).subscribe(resData => {
      id = resData;
    });

    return this.loggedUserToken.pipe(
      take(1),
      switchMap((token) => {
        var id;
        this.getIDForLogOut(users_id).subscribe(resData => {
          console.log("resData");
          console.log(resData);
          id = resData;
        });
        console.log("id");
        console.log(id);
        return this.http.delete(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/logedInUsers/${id}.json?auth=${token}`);
      }));
  }*/

  logut() {
    this._isUserAuthenticated=false;
    this._user.next(null);
    this._logedUserID = "";
  }

}
