import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getBook(bookKey: string) {
    return this.http.get(`/assets/json/${bookKey}.json`);
  }
}
