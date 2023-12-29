import { Component, OnInit } from '@angular/core';
import { SharedService } from '../Service/shared.service';
import * as Highcharts from 'highcharts';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private http:SharedService, private breakpointObserver: BreakpointObserver){}

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

    // this.updateChartData();
    this.breakpointObserver
    .observe(Breakpoints.XSmall).subscribe((result)=>{
      if(result.matches){
        this.chartForSmallScreen();
        console.log("running small")
      }else{
        this.resetChartSize();
        console.log("running large")
      }
    })
  }

  Highcharts = Highcharts
  selectedChartType:string = ''

  barChart:any = {
    chart : {
      type : 'column',
      width : 500,
      height : 350
    },

    title : {
      text : 'Total Active Users'
    },

    xAxis : {
      categories : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
    },

    yAxis : {
      title : {
        text : ''
      }
    },
   series: [
    {
      data: [
        { name: 'Jan', y: 10000, color : 'purple'},
        { name: 'Feb', y: 20000, color : 'blue'},
        { name: 'Mar', y: 20000, color : 'red' },
        { name: 'Apr', y: 60000, color : 'pink' },
        { name: 'May', y: 30000, color : 'navy' },
        { name: 'Jun', y: 40000, color : 'skyblue' },
        { name: 'Jul', y: 50000, color : 'green' },
        { name: 'Aug', y: 20000, color : 'orange' },
        { name: 'Sept',y: 50000, color : 'lime' },
        { name: 'Oct', y: 60000, color : 'black' },
        { name: 'Nov', y: 40000, color : 'violet' },
        { name: 'Dec', y: 80000, color : 'yellow' },
      ],
      name : 'Users'
    }
    ]
  }



  chartForSmallScreen(){
    this.barChart.chart.set = 200;
    this.barChart.chart.height = 200;
  }

  resetChartSize(){
    this.barChart.chart.width = 500;
    this.barChart.chart.height = 350;
  }
  // chartData:any[] = []
  // updateChartData(){

  //   this.chartData = this.activeUsers.map((user: any) => ({
  //     name: this.getMonth(user.createdOn),
  //     y: 1,
  //
  //   }));
  // }

  // getMonth(dateString: string): string {
  //   const date = new Date(dateString);
  //   const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  //   return monthNames[date.getMonth()];
  // }
}
