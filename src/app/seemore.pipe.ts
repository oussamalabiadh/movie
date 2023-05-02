import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seemore'
})
export class SeemorePipe implements PipeTransform {

  transform(overview:any): any {
    return overview.split(' ').slice(0,6).join(' ')
  }

}
