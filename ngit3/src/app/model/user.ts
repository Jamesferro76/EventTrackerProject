import { Game } from "./game";

export class User {

  id:number;
  firstName:string;
  lastName:string;
  username:string;
  password:string;
  email:string;
  active:boolean;
  admin:boolean;
  games?: Game[];

  constructor(
    id:number=0, firstName:string='', lastName:string='', username:string='', password:string='',
  email:string='', active:boolean=true, admin:boolean=false, games: Game[]=[]
  ){
    this.id=id;
    this.firstName=firstName;
    this.lastName=lastName;
    this.username=username;
    this.password=password;
    this.email=email;
    this.active=active;
    this.admin=admin;
    this.games=games;
  }
}
