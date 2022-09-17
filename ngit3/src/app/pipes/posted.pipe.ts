import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../model/game';

@Pipe({
  name: 'posted'
})
export class PostedPipe implements PipeTransform {

  transform(games: Game[], showAll: boolean=false, ...args: unknown[]): Game[] {
    if(showAll){
    return games;
  }

  const result:Game[]= [];
    for (const game of games) {
      if(game.posted){
        result.push(game);
      }
    }
    return result;
  }

}
