import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../Service/shared.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { passwordValidator } from '../passwordValidator';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {

  userForm!: FormGroup;
  selectedId!: any;

  constructor(
    private fb: FormBuilder,
    private http: SharedService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.addUser();
    this.selectedId = this.route.snapshot.queryParamMap.get('id');

    if (this.selectedId) {
      this.editData();
    }

    this.userForm.get('password')?.valueChanges.subscribe((pass:any)=>{
      this.userForm.get('confirmPassword')?.updateValueAndValidity();
    })
  }

  get u(){
    return this.userForm.controls
  }
  addUser() {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      role: ['', [Validators.required]],
      status: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, passwordValidator]],
    });
  }

  submit() {
    if (this.selectedId == null) {
      const data = {
        ...this.userForm.value,
        createdOn: new Date()
      };
      this.http.postData('users', data).subscribe((res: any) => {
        this.toastr.success('User has been added successfully!');
        this.router.navigate(['/user-widget/users/user-list']);
      });
    } else {
      this.updateData();
      this.router.navigate(['/user-widget/users/user-list']);
    }
  }

  editData() {
    const url = 'users/' + this.selectedId;
    this.http.getData(url).subscribe((res: any) => {
      this.userForm.patchValue(res);
    });
  }

  updateData() {
    const url = 'users/' + this.selectedId;
    this.http.updateData(url, this.userForm.value).subscribe((res: any) => {
      this.toastr.warning('User has been updated successfully!');
    });
  }
}
