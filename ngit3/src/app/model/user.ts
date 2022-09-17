import { Game } from "./game";

export class User {

  id:number;
  firstName:string;
  lastName:string;
  userName:string;
  password:string;
  email:string;
  active:boolean;
  admin:boolean;
  games?: Game[];

  constructor(
    id:number=0, firstName:string='', lastName:string='', userName:string='', password:string='',
  email:string='', active:boolean=true, admin:boolean=false, games: Game[]=[]
  ){
    this.id=id;
    this.firstName=firstName;
    this.lastName=lastName;
    this.userName=userName;
    this.password=password;
    this.email=email;
    this.active=active;
    this.admin=admin;
    this.games=games;
  }
}
