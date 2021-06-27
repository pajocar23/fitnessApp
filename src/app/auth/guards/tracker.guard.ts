import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class TrackerGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      try{
      return this.authService.isUserAuthenticated.pipe(take(1),tap(isAuthenticated=>{
        if(!isAuthenticated){
          this.router.navigateByUrl("/login");
        }
      }));
    }catch(Exception){
      console.log(Exception);
    }

  }

}
