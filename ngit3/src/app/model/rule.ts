export class Rule {
  id:number;
  condition:string;
  reward:string;
  inUse:boolean;

  constructor(id:number=0, condition:string="", reward:string="", inUse:boolean=false){
    this.id=id;
    this.condition=condition;
    this.reward=reward;
    this.inUse=inUse;
  }
}
