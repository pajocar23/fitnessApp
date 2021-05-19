import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isUserAuthenticated=false
  private _isRegistered=false
  private _isUserAdmin=false

  constructor() { } 


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

  register(){
    this._isRegistered=true;
  }

  login(){
    this._isUserAuthenticated=true;
  }

  logut(){
    this._isUserAuthenticated=false;
  }

}
