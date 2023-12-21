import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-widget-component',
  templateUrl: './user-widget-component.component.html',
  styleUrls: ['./user-widget-component.component.scss']
})
export class UserWidgetComponentComponent {

  constructor(public router:Router){}
  showFiller:boolean = false;

  // isChanged = false;
  // changeLayout(){
  //   this.isChanged = !this.isChanged
  // }


}
