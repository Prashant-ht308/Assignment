import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private http:SharedService){}

  dataSource:any = []
  totalUsers:any = [];
  activeUsers:any = [];
  inactiveUser:any = [];

  ngOnInit(){
    this.http.getData('users').subscribe((res:any)=>{
      this.dataSource = res;
      this.activeUsers = this.dataSource.filter((active:any)=>{
        return active.status == 'Active';
      });

      this.inactiveUser = this.dataSource.filter((inactive:any)=>{
        return inactive.status == 'Inactive';
      });
    });
  }

  @Input() barChartData: any[] = [];
  @Input() barChartLabels: string[] = [];
  // You can customize or extend options, legend, and chart type as needed
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  barChartLegend = true;
  barChartType = 'bar';

}
