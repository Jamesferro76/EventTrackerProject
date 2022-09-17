import { RuleService } from './../../services/rule.service';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/model/game';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  games: Game[]=[];
  newGame: Game= new Game();
  selected: Game | null=null;
  editGame: Game|null=null;

  constructor(private gameService:GameService, private ruleService:RuleService) { }

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(){
    this.gameService.index().subscribe(
      {
      next: (data)=>{
        this.games=data
      },
      error:(err)=>{
        console.error('TodoListComponent.reload(): error Loading todos: ');
        console.error(err);

      }
      }
    )
  }

  displayTodo(game: Game){
    this.selected=game;
  }

  displayTable(){
    this.selected=null;
  }

  addGame(){
    this.gameService.createGame(this.newGame).subscribe(
      {
      next: (data)=>{
        this.newGame=data
        this.newGame= new Game;
        this.loadGames();
      },
      error:(err)=>{
        console.error('TodoListComponent.reload(): error Loading todos: ');
        console.error(err);

      }
      }
    );

  }

  setEditGame(){
    this.editGame=Object.assign({}, this.selected);
  }
  cancelEdit(){
    this.editGame=null;
  }

  updateGame(updateGame: Game){
    if(this.editGame!=null){
      updateGame.id=this.editGame.id;
    }
    this.gameService.updateGame(updateGame).subscribe(
      {
      next: (result)=>{
        this.selected=result;
        this.editGame=null;
        this.loadGames();
      },
      error:(err)=>{
        console.error('TodoListComponent.UpdateTodo(): error Updating todos: ');
        console.error(err);

      }
      }
    );
  }

  deleteGame(id:number){
    this.gameService.destroy(id).subscribe(
      {
      next: ()=>{
        this.loadGames();
      },
      error:(err)=>{
        console.error('TodoListComponent.delete(): error Deleting todos: ');
        console.error(err);

      }
      }
    );
  }

}
