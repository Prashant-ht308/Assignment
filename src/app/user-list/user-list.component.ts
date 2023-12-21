import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../Services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  dataSource:any;
  constructor(private http:SharedService, private toastr:ToastrService, private dialog:MatDialog){}

  displayedColumns = ["checkbox","id", "name", "email", "phone", "lastLogin", "role", "status", "action"];
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  selection = new SelectionModel<any>(true, []);

  ngOnInit(){
    this.getUserData();
  }

  data:any;

  getUserData(){
    this.http.getData('users').subscribe((res:any)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.data = res;
      // this.dataSource.sort = this.sort
    })
  }

  deleteUser(index:number, id:string){
    let config = new MatDialogConfig();
    config.width = "700px";
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result:boolean)=>{
      if(result === true){
        const url = `users/${id}`;
        this.http.deleteData(url).subscribe((response: any) => {
          const data = this.dataSource.data;
          data.splice(index, 1);
          this.dataSource.data = data;
          this.dataSource._updateChangeSubscription(response);
        })
        this.toastr.error('User deleted successfully!');
      }
    })
  }

  ascendingSort(){
   let newArr = this.data.sort((a:any,b:any)=> a.id - b.id);
   this.dataSource = newArr
   console.log("working", newArr)
  }

  descendingSort(){
   let newArr = this.data.sort((a:any,b:any)=> b.id - a.id);
   this.dataSource = newArr;
   console.log("working",newArr)
  }


  ascendingDateSort(){
    let newArr = this.data.sort((a: any, b: any) => {
      const dateA = new Date(a.createdOn).getTime();
      const dateB = new Date(b.createdOn).getTime();
      return dateA - dateB;
    });

    this.dataSource = new MatTableDataSource(newArr);
  }


  descendingDateSort() {
    let newArr = this.data.sort((a: any, b: any) => {
      const dateA = new Date(a.createdOn).getTime();
      const dateB = new Date(b.createdOn).getTime();
      return dateB - dateA;
    });

    this.dataSource = new MatTableDataSource(newArr);
  }

  admin(){
    this.dataSource.data = this.data.filter((admin:any)=>{
      return admin.role == 'Admin';
    })
  }

  user(){
    this.dataSource.data = this.data.filter((user:any)=>{
      return user.role == 'User';
    })
  }

  selectAll:boolean = false;

  toggleSelectAll(){
    if(this.selectAll){
      this.dataSource.data.forEach((el:any) => {
        el.selected == false
      });
    }

  }

  getfilteredData(data:any){
    this.dataSource.data = data;
  }

  searchTerm:any;
  getSearchData(data:any){
    this.searchTerm = data;
  }

 /** Whether the number of selected elements matches the total number of rows. */
 isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row:any) => this.selection.select(row));
}

logSelection() {
  this.selection.selected.forEach(s => console.log(s.name));
}


}
