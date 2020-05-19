import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  allowedRoutes: string[] = [
    'rfcfes',
    'sc'
  ];
  alreadyRedirected: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.alreadyRedirected = false;
  }

  checkUrlAndRedirect() {
    if (!this.alreadyRedirected) {
      let redirectPath = this.activatedRoute.snapshot.queryParamMap.get('redirect');

      if (this.isValidRoute(redirectPath)) {
        this.alreadyRedirected = true;

        this.router.navigate(['/' + redirectPath]);
      }
    }
  }

  isValidRoute(redirectPath: string) {
    return redirectPath != null && this.allowedRoutes.indexOf(redirectPath) > -1;
  }
}
