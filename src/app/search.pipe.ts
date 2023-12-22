import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchTerm: any): any {
   if(!searchTerm){
    return value;
   }

   return value.filter((user:any) => {
    const fullName = user.firstName + user.lastName;
    return fullName.toLowerCase().includes(searchTerm);
   })
  }


}
