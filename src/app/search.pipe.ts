import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchTerm: any): any {
    console.log("pipe",value, searchTerm)
    return value;
    // if (!searchTerm) {
    //   console.log("searchedValue",value)
    //   return value;
    // } else {
    //   return value.filter((term:any) =>{
    //     console.log("searchedValue",value)
    //     term.firstName.toLowerCase().includes(searchTerm)
    //   })
    // }
  }


}
