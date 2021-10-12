import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(new RegExp("[0-9 ]{12}"))]],
      email: ['', [Validators.required, Validators.pattern("[A-Za-z0-0]*@gmail.com")]],
      password: ['', [Validators.required, Validators.pattern("[A-Za-z0-9@!_]{6,}")]],
      role: []
    })
  }
  register() {
    this.successMessage = "Successfully register In ..."
    console.log(this.regForm)
  }

}
