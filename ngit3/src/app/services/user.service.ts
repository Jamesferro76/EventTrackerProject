import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8082/'; // adjust port to match server
  private url = this.baseUrl + 'api/user/'; // change 'todos' to your API path

    constructor(private http: HttpClient) { }

  login(username: string, password: string){
    return this.http.get<User>(this.url+username+"/"+password).pipe(
      catchError((err: any)=>{
        console.log(err);
        return throwError(
          ()=>new Error(
            'GameService.index():error retrieving Game List: '+ err
          )
        );
      })
    );
  }
}
