import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { take, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


interface AuthResponseData{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  localId:string;
  expiresIN:string;
  registered?:boolean;
}

/*interface UserData{
  localId:string;
  email:string;
}*/

interface UserData{
  email:string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isUserAuthenticated=false
  private _isRegistered=false
  private _isUserAdmin=true
  _logedUserID=""; //setuje se kad se korisnik loginuje

  //ova dva parametra ce se setovati u formi za registraciju, a prosledice se u bazi nakon sto se unesu metrike
  //ove se radi kako bi se izbeglo da se prvo u bazu unesu email i sifra, a ako se izadje iz aplikacije, taj email i ta sifra su vec uneti
  //i ne moze se sa tim mailom pristupiti stranici za popunjavanje metrika
  _email:string;
  _password:string;

  private _user=new BehaviorSubject<User>(null); 

  constructor(private http:HttpClient) { } 


  get email(){
    return this._email;
  }

  get logedUserID(){
    return this._logedUserID;
  }

  get password(){
    return this._password;
  }

  get isUserAuthenticated(){
    //return this._isUserAuthenticated;
    return this._user.asObservable().pipe(
      map((user:User)=>{
        if(user){
          return !!user.token;
        }else{
          return false;
        }
      })
    );
  }

  get isRegistered():boolean{
    return this._isRegistered;
  }

  get isUserAdmin():boolean{
    return this._isUserAdmin;
  }

  userIsAdmin(){
    this._isUserAdmin=true;
  }

  userIsNotAdmin(){
    this._isUserAdmin=false;
  }

  setIsRegisteredToTrue(){ //ako klikne register na formi za registrovanje
    this._isRegistered=true;
  }

  register(user:UserData){
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
    {email:user.email,password:user.password,returnSecureToken:true})
    .pipe(
      tap((userData:AuthResponseData)=>{
        const expirationTime=new Date(new Date().getTime()+ +userData.expiresIN *1000);
        const user=new User(userData.localId,userData.email,userData.idToken,expirationTime);
        this._user.next(user);      
      })
      );
  }


  login(user:UserData){
    this._isUserAuthenticated=true;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
    {email:user.email,password:user.password,returnSecureToken:true})
    .pipe(
      tap((userData:AuthResponseData)=>{
        const expirationTime=new Date(new Date().getTime()+ +userData.expiresIN *1000);
        const user=new User(userData.localId,userData.email,userData.idToken,expirationTime);
        this._user.next(user);
      })
      );
  }

  logut(){
    this._user.next(null);
    this._logedUserID="";
    
    //this._isUserAuthenticated=false;
  }

}
