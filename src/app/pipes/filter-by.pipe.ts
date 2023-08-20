import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(values: any[], args: any[]): unknown {
    if (values && args?.[0]) {
      return values.filter(v => 
        args[1].some(attr => { return RegExp(args[0]).test(v[attr])})
      );
    }
    return values;
  }

}
