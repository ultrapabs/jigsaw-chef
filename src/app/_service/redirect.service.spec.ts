import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { RedirectService } from './redirect.service';

describe('RedirectService', () => {
  let router: MockRouter;
  let activatedRoute: MockActivatedRoute;
  let redirectService: RedirectService;

  beforeEach(() => {
    router = new MockRouter();
    activatedRoute = new MockActivatedRoute();

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute },
        RedirectService
      ]
    });

    redirectService = TestBed.get(RedirectService);
  });

  it('should be created', () => {
    const service: RedirectService = TestBed.get(RedirectService);
    expect(service).toBeTruthy();
  });

  it('checks the url parameters and redirects if a valid route', () => {
    spyOn(redirectService, 'isValidRoute').and.returnValue(true);
    spyOn(router, 'navigate');

    redirectService.checkUrlAndRedirect();
    expect(router.navigate).toHaveBeenCalledWith(['/test']);
    expect(redirectService.alreadyRedirected).toBe(true);
  });

  it('checks the url parameters and does not redirect if an invalid route', () => {
    spyOn(redirectService, 'isValidRoute').and.returnValue(false);
    spyOn(router, 'navigate');

    redirectService.checkUrlAndRedirect();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(redirectService.alreadyRedirected).toBe(false);
  });

  it('does not check the url parameters or redirect if a redirect has already happened', () => {
    redirectService.alreadyRedirected = true;
    spyOn(router, 'navigate');

    redirectService.checkUrlAndRedirect();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('knows if a redirect path is valid', () => {
    let undefinedKey;
    let nullKey = null;
    let invalidKey = 'abcdefg';
    let validKey = 'rfcfes';

    expect(redirectService.isValidRoute(undefinedKey)).toBe(false);
    expect(redirectService.isValidRoute(nullKey)).toBe(false);
    expect(redirectService.isValidRoute(invalidKey)).toBe(false);
    expect(redirectService.isValidRoute(validKey)).toBe(true);
  });
});

export class MockRedirectService {

    alreadyRedirected: boolean = false;

    allowedRoutes: string[] = [];

    constructor() { }

    checkUrlAndRedirect() { }
}

export class MockRouter {

  constructor() { }

  navigate() { }
}

export class MockActivatedRoute {

  constructor() { }

  snapshot: any = {
    queryParamMap: {
      get: (key) => {
        if (key === 'redirect') {
          return 'test';
        } else {
          return null;
        }
      }
    }
  }
}
