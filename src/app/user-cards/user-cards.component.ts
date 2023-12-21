import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../Services/shared.service';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.scss']
})
export class UserCardsComponent implements OnInit{

  constructor(private http:SharedService, private toastr:ToastrService, private dialog:MatDialog){}

  dataSource:any = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(){
    this.http.getData('users').subscribe((res:any)=>{
      this.dataSource = res;
      this.dataSource.paginator = this.paginator;
    })
  }

  // deleteUser(index:number, id:string){
  //   const url = `users/${id}`;
  //   this.http.deleteData(url).subscribe((res:any)=>{
  //     this.dataSource.splice(index,1);
  //     this.toastr.warning('User deleted successfully!');
  //   })
  // }


  deleteUser(index:number, id:string){
    let config = new MatDialogConfig();
    config.width = "700px";
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result:boolean)=>{
      if(result === true){
        const url = `users/${id}`;
        this.http.deleteData(url).subscribe((response: any) => {
          this.dataSource.splice(index,1);
          this.dataSource._updateChangeSubscription(response);
        })
        this.toastr.error('User deleted successfully!');
      }
    })
  }

  getfilteredData(data:any){
    this.dataSource.data = data;
  }

  ascendingSort(){
    let newArr = this.dataSource.sort((a:any,b:any)=> a.id - b.id);
    this.dataSource = newArr
    console.log("ascending", newArr)
   }

   descendingSort(){
    let newArr = this.dataSource.sort((a:any,b:any)=> b.id - a.id);
    this.dataSource = newArr;
    console.log("desc",newArr)
  }


  ascendingDateSort(){
    let newArr = this.dataSource.sort((a: any, b: any) => {
      const dateA = new Date(a.createdOn).getTime();
      const dateB = new Date(b.createdOn).getTime();
      return dateA - dateB;
    });

    this.dataSource = newArr;
    console.log("asceDate",newArr)
  }


  descendingDateSort() {
    let newArr = this.dataSource.sort((a: any, b: any) => {
      const dateA = new Date(a.createdOn).getTime();
      const dateB = new Date(b.createdOn).getTime();
      return dateB - dateA;
    });

    console.log("descDate",newArr)
    this.dataSource = newArr;
   }

   admin(){
     this.dataSource.data = this.dataSource.filter((admin:any)=>{
       console.log("admin",admin)
       return admin.role == 'Admin';
     })
   }

   user(){
     this.dataSource.data = this.dataSource.filter((user:any)=>{
       return user.role == 'User';
     })
   }


}
