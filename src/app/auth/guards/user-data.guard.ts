import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) {

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    try {
      if (!this.authService.isRegistered) {
        this.router.navigateByUrl("/register");
      }
      return this.authService.isRegistered;
    } catch (Exception) {
      console.log(Exception);
    }
  }
}
