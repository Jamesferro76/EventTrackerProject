import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Game } from '../model/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:8082/'; // adjust port to match server
private url = this.baseUrl + 'api/games'; // change 'todos' to your API path
  constructor(private http: HttpClient) { }

  index(){
    return this.http.get<Game[]>(this.url).pipe(
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

  searchByTitle(search: string){
    return this.http.get<Game[]>(this.url+"/title/"+search).pipe(
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

  createGame(newGame: Game){
    newGame.posted=true;
    console.log(newGame.title);
    return this.http.post<Game>(this.baseUrl+"api/user/1/games", newGame).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'TodoService.create(): error creating Todo: ' + err )
        );
      })
    );
  }


  updateGame(updateTodo: Game){

    // if(updateTodo.completed){
    //   updateTodo.completeDate=this.datePipe.transform(Date.now(), 'shortDate');
    // }else{
    //   updateTodo.completeDate='';
    // }

    return this.http.put<Game>(this.baseUrl+"api/user/1/games/"+updateTodo.id, updateTodo).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'TodoService.update(): error updating Todo: ' + err )
        );
      })
    );

  }

  destroy(id: number){

    return this.http.delete<Game>(this.baseUrl+"api/user/1/games/"+id).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(
           () => new Error( 'TodoService.delete(): error deleting Todo: ' + err )
        );
      })
    );
  }

}
