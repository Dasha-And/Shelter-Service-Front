import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-account-data',
  templateUrl: './change-account-data.component.html',
  styleUrls: ['./change-account-data.component.css']
})
export class ChangeAccountDataComponent implements OnInit {
  accountAdminData!: FormGroup;
  constructor(private fb: FormBuilder) { }
  flag: boolean = true;


  apply(value: string) {
    this.flag = value === "changeShelterAccounter" ? true : false;
  }
  ngOnInit(): void {
    this.accountAdminData = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("[A-Za-zА-Яа-яЁёІіЇїЄє]{2,20}")]],
      lastName: ['', [Validators.required, Validators.pattern("[A-Za-zА-Яа-яЁёІіЇїЄє]{2,20}")]],
      phone: ['', [Validators.required, Validators.pattern(new RegExp("[0-9 ]{12}"))]],
      email: ['', [Validators.required, Validators.pattern(new RegExp("\\w+@\\w+\\.\\w+"))]],
      password: ['', [Validators.required, Validators.pattern("[A-Za-z0-9@!_]{6,}")]],
    })
  }
  change() {

  }

}
