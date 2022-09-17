import { InUsePipe } from './../../pipes/in-use.pipe';
import { RuleService } from './../../services/rule.service';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/model/game';
import { Rule } from 'src/app/model/rule';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  login:boolean=false;
  games: Game[]=[];
  newGame: Game= new Game();
  selected: Game | null=null;
  editGame: Game|null=null;
  search: string='';

  newRule: Rule=new Rule();
  rules: Rule[]=[];
  // selectedRule: Rule | null=null;
  editRule: Rule|null=null;

  showComplete:boolean=false;
  showAll:boolean=false;

  constructor(private gameService:GameService, private ruleService:RuleService, private inUsePipe: InUsePipe) { }

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

  displayGame(game: Game){
    this.selected=game;
    this.loadRules();
  }

  displayTable(){
    this.loadGames();
    this.selected=null;
    this.editGame=null;
    this.editRule=null;
  }

  searchByTitle(){
    this.selected=null;
    this.editGame=null;
    this.editRule=null;
    if(this.search===""){
      this.loadGames();
    }else{
    this.gameService.searchByTitle(this.search).subscribe(
      {
      next: (data)=>{
        this.games=data;
        this.search="";
      },
      error:(err)=>{
        console.error('TodoListComponent.reload(): error Loading todos: ');
        console.error(err);

      }
      }
    )
    }
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
  updateGameHome(updateGame: Game){
    if(this.editGame!=null){
      updateGame.id=this.editGame.id;
    }
    this.gameService.updateGame(updateGame).subscribe(
      {
      next: (result)=>{
        this.selected=null;
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

  loadRules(){
    if(this.selected){
    this.ruleService.index(this.selected.id).subscribe(
      {
      next: (data)=>{
        this.rules=data
      },
      error:(err)=>{
        console.error('TodoListComponent.reload(): error Loading todos: ');
        console.error(err);

      }
      }
    )
  }
}

  addRule(){
    if(this.selected){
    this.ruleService.createRule(this.newRule, this.selected.id).subscribe(
      {
      next: (data)=>{
        this.newRule=data
        this.newRule= new Rule();
        this.loadRules();
      },
      error:(err)=>{
        console.error('TodoListComponent.reload(): error Loading todos: ');
        console.error(err);

      }
      }
    );

  }
}

setEditRule(ruleToEdit: Rule){
  this.editRule=Object.assign({}, ruleToEdit);
}
cancelEditRule(){
  this.editRule=null;
}

updateRule(updateRule: Rule){
  if(this.editRule!=null){
    updateRule.id=this.editRule.id;
  }
  if(this.selected){
  this.ruleService.updateRule(updateRule, this.selected.id).subscribe(
    {
    next: (result)=>{
      this.editRule=result;
      this.editRule=null;
      this.loadRules();
    },
    error:(err)=>{
      console.error('HomeComponent.UpdateRule(): error Updating rules: ');
      console.error(err);

    }
    }
  );
  }
}

deleteRule(gameId:number, ruleId:number){
  this.ruleService.destroy(gameId, ruleId).subscribe(
    {
    next: ()=>{
      this.loadRules();
    },
    error:(err)=>{
      console.error('HomeComponent.delete(): error Deleting rules: ');
      console.error(err);

    }
    }
  );
}

}
