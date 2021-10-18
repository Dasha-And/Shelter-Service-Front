import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-form-reg',
  templateUrl: './admin-form-reg.component.html',
  styleUrls: ['./admin-form-reg.component.css']
})
export class AdminFormRegComponent implements OnInit {
  successMessage: string = " ";
  adminRegForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.adminRegForm = this.fb.group({
      name: ['', [Validators.required]],
      longtitude: ['', Validators.required],
      latitude: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(new RegExp("[0-9 ]{12}"))]],
      email: ['', [Validators.required, Validators.pattern("[A-Za-z0-0]*@gmail.com")]],
      siteUrl: ['', Validators.required, Validators.pattern("")]
    })
  }
  regForm() {
    this.successMessage = "Successfully register In ..."
    console.log(this.adminRegForm)
  }
}