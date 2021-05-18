import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isUserAuthenticated=false

  constructor() { } 


  get isUserAuthenticated():boolean{
    return this._isUserAuthenticated;
  }

  login(){
    this._isUserAuthenticated=true;
  }

  logut(){
    this._isUserAuthenticated=false;
  }

}
