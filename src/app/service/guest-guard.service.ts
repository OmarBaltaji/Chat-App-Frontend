import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuardService {

  constructor(private router:Router, private cookieService: CookieService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(!this.cookieService.get('access_token')) {
      return true;
    }
    this.router.navigateByUrl('/'); // The user will be redirect to home page once authenticated
    return false;
  }
}
