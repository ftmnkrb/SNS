import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.user.pipe(
      map(user => {
        return user ? true : false
      }),
      tap(isAuth => {
        if (!isAuth) {
          this.router.navigate(["/auth"])
        }else{
          let verified = JSON.parse(localStorage.getItem('verified')!)

          if(!verified){
            this.router.navigate(["/auth/registration-steps"])
          }
        }
      })
    )
  }

}
