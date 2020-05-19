import { TestBed } from '@angular/core/testing';
import { GoogleAnalyticsService } from './google-analytics.service';

describe('GoogleAnalyticsService', () => {
  let gaService: GoogleAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GoogleAnalyticsService
      ]
    });

    gaService = TestBed.get(GoogleAnalyticsService);
  });

  it('should be created', () => {
    const service: GoogleAnalyticsService = TestBed.get(GoogleAnalyticsService);
    expect(service).toBeTruthy();
  });

  it('tracks a book visit event', () => {
    let testKey = 'somekey';
    spyOn(gaService, 'gtagWrapper');

    gaService.visitEvent(testKey);
    expect(gaService.gtagWrapper).toHaveBeenCalledWith('event', `book_visit_${testKey}`);
  });
});

export class MockGoogleAnalyticsService {

  constructor() { }

  visitEvent(bookKey: string) {
    bookKey = null;
  }

  gtagWrapper(gType: string, eventName: string) {
    gType = null;
    eventName = null;
  }
}
