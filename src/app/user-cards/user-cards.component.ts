import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../Service/shared.service';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.scss']
})
export class UserCardsComponent implements OnInit{

  constructor(private http:SharedService,private changeDetectorRef: ChangeDetectorRef, private toastr:ToastrService, private dialog:MatDialog){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource!:any

  searchTerm:string = ''
  ngOnInit(){
    this.http.getData('users').subscribe((res:any)=>{
      this.changeDetectorRef.detectChanges();
      this.dataSource = new MatTableDataSource<any>(res);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    })
  }


  getSearchTerm(searchData:any){
    this.searchTerm = searchData;
  }

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
