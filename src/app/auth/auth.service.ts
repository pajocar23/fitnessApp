import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { take, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIN: string;
  registered?: boolean;
}

interface adminStatusData {
  id: string,
  userIsAdmin: boolean;
  userId: string; //spoljni kljuc ka tabeli korisnika
}

/*interface UserData{
  localId:string;
  email:string;
}*/

interface UserData {
  email: string;
  password: string;
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
          return !!user.token;
        } else {
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
          const expirationTime = new Date(new Date().getTime() + +userData.expiresIN * 1000);
          const user = new User(userData.localId, userData.email, userData.idToken, expirationTime);
          this._user.next(user);
        })
      );
  }

  setAdminStatus(userIsAdmin: boolean, userId: string) {
    return this.http.post<{ name: string }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userAdminStatus.json`,
      { userIsAdmin, userId });
  }

  isLogedUserAdmin() {
    return this.http.get<{ [key: string]: adminStatusData }>(`https://healthy-life-app-2ecc5-default-rtdb.europe-west1.firebasedatabase.app/userAdminStatus.json`)
      .pipe(map((adminStatusData) => {

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
          console.log("1:");
          console.log(_admiStatusData[i].userId);
          console.log("2:");
          console.log(this._logedUserID);

          if (_admiStatusData[i].userId == this._logedUserID) {
            isUserAdmin = _admiStatusData[i].userIsAdmin;
            console.log("provera1:");
            console.log(isUserAdmin);
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
          const expirationTime = new Date(new Date().getTime() + +userData.expiresIN * 1000);
          const user = new User(userData.localId, userData.email, userData.idToken, expirationTime);
          this._user.next(user);
        })
      );
  }

  logut() {
    this._user.next(null);
    this._logedUserID = "";

    //this._isUserAuthenticated=false;
  }

}
