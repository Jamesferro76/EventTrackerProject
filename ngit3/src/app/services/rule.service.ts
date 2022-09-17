import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RuleService {
  private baseUrl = 'http://localhost:8082/'; // adjust port to match server
private url = this.baseUrl + 'api/todos'; // change 'todos' to your API path

  constructor(private http: HttpClient) { }
}
