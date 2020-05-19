import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let http: MockHttpClient;
  let apiService: ApiService;

  beforeEach(() => {
    http = new MockHttpClient();

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: http },
        ApiService
      ]
    });

    apiService = TestBed.get(ApiService);
  });


  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });


  it('makes a get request using a book key', () => {
    let testKey = 'somekey';
    spyOn(http, 'get');

    apiService.getBook(testKey);
    expect(http.get).toHaveBeenCalledWith(`/assets/json/${testKey}.json`);
  });
});

export class MockApiService {

  constructor() { }

  getBook(bookKey: string) {
    bookKey = null;
  }
}

export class MockHttpClient {

  constructor() { }

  get(url: string) {
    url = null;
  }
}
