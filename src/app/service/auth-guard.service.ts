import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router:Router, private cookieService: CookieService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.cookieService.get('access_token')) { // Check if there is an access token in the local storage otherwise redirect user to login page
      return true;
    }
    this.cookieService.delete('access_token'); 
    this.router.navigateByUrl('/login');
    return false;
  }
}
