import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastlogin'
})
export class LastloginPipe implements PipeTransform {

  transform(value: Date): string {
    const now = new Date();
    const date = new Date(value);

    // Set the time part of both dates to midnight
    now.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays === 2) {
      return '1 day ago';
    } else if (diffDays === 3) {
      return '2 day ago';
    } else if(diffDays === 7) {
      return `1 week ago`;
    }else if(diffDays === 30){
      return `1 Month ago`;
    }else{
      return `Never`
    }
  }


}
