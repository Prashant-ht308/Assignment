import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../Service/shared.service';
import { passwordValidator } from '../passwordValidator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: SharedService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.addUser();
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
      const data = {
        ...this.userForm.value,
        createdOn: new Date(),
      };
      this.http.postData('users', data).subscribe((res: any) => {
        this.toastr.success('Your account has been created successfully!');
        this.router.navigate(['/signIn'])
      });
  }

}
