import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Rule } from '../model/rule';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RuleService {
  private baseUrl = 'http://localhost:8082/'; // adjust port to match server
private url = environment.baseUrl; // change 'todos' to your API path

  constructor(private http: HttpClient) { }

    index(gameId: number){
      return this.http.get<Rule[]>(this.url+"api/games/"+gameId+"/rules").pipe(
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

    createRule(newRule: Rule, gameId: number){
      newRule.inUse=true;
      console.log(newRule.condition);
      return this.http.post<Rule>(this.url+"api/games/"+gameId+"/rules", newRule).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'TodoService.create(): error creating Todo: ' + err )
          );
        })
      );
    }


    updateRule(updateRule: Rule, gameId: number){

      // if(updateTodo.completed){
      //   updateTodo.completeDate=this.datePipe.transform(Date.now(), 'shortDate');
      // }else{
      //   updateTodo.completeDate='';
      // }

      return this.http.put<Rule>(this.url+"api/games/"+gameId+"/rules/"+updateRule.id, updateRule).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'TodoService.update(): error updating Todo: ' + err )
          );
        })
      );

    }

    destroy(gameId: number, ruleId: number){

      return this.http.delete<Rule>(this.url+"api/games/"+gameId+"/rules/"+ruleId).pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(
             () => new Error( 'TodoService.delete(): error deleting Todo: ' + err )
          );
        })
      );
    }
}
