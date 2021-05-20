import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


interface AuthResponseData{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  localID:string;
  expiresIN:string;
  registered?:boolean;
}

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
  private _isUserAdmin=false

  private _user=new BehaviorSubject<User>(null); 

  constructor(private http:HttpClient) { } 


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

  register(user:UserData){
    this._isRegistered=true;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
    {email:user.email,password:user.password,returnSecureToken:true})
    .pipe(
      tap((userData:AuthResponseData)=>{
        const expirationTime=new Date(new Date().getTime()+ +userData.expiresIN *1000);
        const user=new User(userData.localID,userData.email,userData.idToken,expirationTime);
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
        const user=new User(userData.localID,userData.email,userData.idToken,expirationTime);
        this._user.next(user);
      })
      );
  }

  logut(){
    this._user.next(null);
    //this._isUserAuthenticated=false;
  }

}
