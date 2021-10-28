import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

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
      const userId = params['userId'];
      this.router.navigate(['/adminFormReg/:userId'], {queryParams: {userId: userId}});
    });

  }
}
