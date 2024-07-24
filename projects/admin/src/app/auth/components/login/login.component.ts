import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
     private fb:FormBuilder ,
     private service:LoginService, 
     private toaster:ToastrService,
     private router:Router,
     private spinner: NgxSpinnerService
    ) { }

  loginForm!:FormGroup
  ngOnInit(): void {
    this.createForm()

  }
  createForm(){
    this.loginForm =this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role:['admin']

    })
  }
  login(){
    this.spinner.show();
    this.service.login(this.loginForm.value).subscribe((res:any) =>{
      localStorage.setItem("token",res.token)
     // Gestion du succèssetU
    this.toaster.success('Login successful!', 'Success');
    this.router.navigate(['/tasks'])
    this.spinner.hide();

    },error => {
     // Gestion des erreurs
     console.log(error)
     this.toaster.error(error.message)
     this.toaster.error('Login failed. Please check your credentials and try again.', 'Error');
     this.spinner.hide();

      
    })
  }


}
