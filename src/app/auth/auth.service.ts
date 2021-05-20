import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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

  constructor(private http:HttpClient) { } 


  get isUserAuthenticated():boolean{
    return this._isUserAuthenticated;
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
    {email:user.email,password:user.password,returnSecureToken:true});
  }

  login(user:UserData){
    this._isUserAuthenticated=true;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
    {email:user.email,password:user.password,returnSecureToken:true});
  }

  logut(){
    this._isUserAuthenticated=false;
  }

}
