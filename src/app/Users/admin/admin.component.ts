import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Shelter} from "../../model/shelter";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../model/user";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  goToShelterReg() {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      this.router.navigate(['/adminFormReg/:email'], {queryParams: {email: email}});
    });

  }
}
