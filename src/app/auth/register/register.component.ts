import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  flag: boolean = true;


  apply(value: string) {
    this.flag = value === "login" ? true : false;
  }
  successMessage: string = " ";
  regForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("[A-Za-zА-Яа-яЁёІіЇїЄє]{2,20}")]],
      surname: ['', [Validators.required ,Validators.pattern("[A-Za-zА-Яа-яЁёІіЇїЄє]{2,20}") ]],
      phone: ['', [Validators.required, Validators.pattern(new RegExp("[0-9 ]{12}"))]],
      email: ['', [Validators.required, Validators.pattern(new RegExp("\\w+@\\w+\\.\\w+"))]],
      password: ['', [Validators.required, Validators.pattern("[A-Za-z0-9@!_]{6,}")]],
      role: []
    })
  }
  register() {
    // @ts-ignore
    //document.getElementById('add-sport-form').click();
    this.userService.addUser(this.regForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.regForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.regForm.reset();
      }
    );
    alert("Ви успішно зареєстровані! Тепер увійдіть до свого акаунту");
    console.log(this.regForm)
  }

}
