import { Rule } from "./rule";

export class Game {

  id:number;
  title:string;
  description:string;
  posted:boolean;
  rules?: Rule[];

  constructor(id:number=0, title:string="", description:string="", posted:boolean=false, rules:Rule[]=[]){
    this.id=id;
    this.title=title;
    this.description=description;
    this.posted=posted;
    this.rules=rules;
  }

}
