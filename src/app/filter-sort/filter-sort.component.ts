import { Component, DoCheck, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '../Service/shared.service';
import { MatPaginator } from '@angular/material/paginator';
import { Platform } from '@angular/cdk/platform';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-filter-sort',
  templateUrl: './filter-sort.component.html',
  styleUrls: ['./filter-sort.component.scss']
})
export class FilterSortComponent implements OnInit {

  dataSource:any;
  data:any;
  searchTerm!:string;

  @Output() emitChildData:EventEmitter<any> = new EventEmitter<any>();
  @Output() searchedDataEmitter: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!:MatPaginator;

  isSmallScreen:boolean = false;

  constructor(private http:SharedService, private breakpointObserver:BreakpointObserver, private platform:Platform){
    // this.isSmallScreen = this.platform.isSmallScreen;
  }

  ngOnInit(){
    this.http.getData('users').subscribe((res:any)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.data = res;

    });

    this.breakpointObserver
    .observe(Breakpoints.XSmall).subscribe((result)=>{
      this.isSmallScreen = false;
      if(result.matches){
        this.isSmallScreen = true;
      }
    })

  }


  //send data to parent
  ascendingSort(){
    let newArr = this.data.sort((a:any,b:any)=> a.id - b.id);
    this.dataSource = newArr
    this.emitChildData.emit(newArr);
    console.log("working", newArr)
  }

  descendingSort(){
    let newArr = this.data.sort((a:any,b:any)=> b.id - a.id);
    this.dataSource = newArr;
    this.emitChildData.emit(newArr);
    console.log("working",newArr)
  }


  ascendingDateSort(){
    let newArr = this.data.sort((a: any, b: any) => {
      const dateA = new Date(a.createdOn).getTime();
      const dateB = new Date(b.createdOn).getTime();
      return dateA - dateB;
    });
    this.emitChildData.emit(newArr);
    this.dataSource = new MatTableDataSource(newArr);
  }


  descendingDateSort() {
    let newArr = this.data.sort((a: any, b: any) => {
      const dateA = new Date(a.createdOn).getTime();
      const dateB = new Date(b.createdOn).getTime();
      return dateB - dateA;
    });
    this.emitChildData.emit(newArr);
    this.dataSource = new MatTableDataSource(newArr);
   }

   admin(){
     this.dataSource.data = this.data.filter((admin:any)=>{
       return admin.role == 'Admin';
     })
     this.emitChildData.emit(this.dataSource.data);
    }

    user(){
      this.dataSource.data = this.data.filter((user:any)=>{
        return user.role == 'User';
      })
      this.emitChildData.emit(this.dataSource.data);
   }

   searchedData() {
  this.searchedDataEmitter.emit(this.searchTerm);
    console.log("data emited ")
}
}
