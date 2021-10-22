import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-shelter-data',
  templateUrl: './change-shelter-data.component.html',
  styleUrls: ['./change-shelter-data.component.css']
})
export class ChangeShelterDataComponent implements OnInit {
  accountShelterChange!: FormGroup;
  constructor(private fb: FormBuilder) { }
  flag: boolean = true;


  apply(value: string) {
    this.flag = value === "changeShelterAccounter" ? true : false;
  }
  ngOnInit(): void {
    this.accountShelterChange = this.fb.group({
      name: ['', [Validators.required]],
      longtitude: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      latitude: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      phone: ['', [Validators.required, Validators.pattern(new RegExp("[0-9 ]{12}"))]],
      email: ['', [Validators.required, Validators.pattern(new RegExp("\\w+@\\w+\\.\\w+"))]],
      siteUrl: ['', [Validators.required, Validators.pattern(new RegExp("https?://.+"))]],
    })
  }
  change() {

  }
}
