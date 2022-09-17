import { Pipe, PipeTransform } from '@angular/core';
import { Rule } from '../model/rule';

@Pipe({
  name: 'inUse'
})
export class InUsePipe implements PipeTransform {

  transform(rules: Rule[], showComplete: boolean=false, ...args: unknown[]): Rule[] {
    if(showComplete){
    return rules;
  }

  const result:Rule[]= [];
    for (const rule of rules) {
      if(rule.inUse){
        result.push(rule);
      }
    }
    return result;
  }

}
