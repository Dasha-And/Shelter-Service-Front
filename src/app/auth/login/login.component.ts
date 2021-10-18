import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  flag: boolean = true;


  apply(value: string) {
    this.flag = value === "login" ? true : false;
  }
  successMessage: string = " ";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("[A-Za-z0-0]*@gmail.com")]],
      password: ['', [Validators.required, Validators.pattern("[A-Za-z0-9@!_]{6,}")]]
    })
  }
  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.loginForm.reset();
        if (response.role == 'user') {
          alert("Юзер");
        } else if (response.role == 'admin') {
          this.router.navigate(['/adminPage']);
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.loginForm.reset();
      }
    );

    this.successMessage = "Successfully Loggined In ..."
  }
}
