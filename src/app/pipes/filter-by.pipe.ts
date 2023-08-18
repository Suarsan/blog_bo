import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(values: any[], args: any): unknown {
    if (values && args) {
      return values.filter(v => RegExp(args).test(v.title));
    }
    return values;
  }

}
