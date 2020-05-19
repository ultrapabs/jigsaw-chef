import { Injectable } from '@angular/core';

declare let gtag:Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }

  visitEvent(bookKey: string) {
    this.gtagWrapper('event', `book_visit_${bookKey}`);
  }

  gtagWrapper(gType: string, eventName: string) {
    gtag(gType, eventName, {});
  }
}
