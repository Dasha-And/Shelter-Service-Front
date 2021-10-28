import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User} from "../../../../model/user";
import {HttpErrorResponse} from "@angular/common/http";
import {ShelterService} from "../../../../service/shelter.service";
import {Shelter} from "../../../../model/shelter";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../service/user.service";

@Component({
  selector: 'app-admin-form-reg',
  templateUrl: './admin-form-reg.component.html',
  styleUrls: ['./admin-form-reg.component.css']
})
export class AdminFormRegComponent implements OnInit {
  successMessage: string = " ";
  adminRegForm!: FormGroup;

  constructor(private fb: FormBuilder, private shelterService: ShelterService, private route: ActivatedRoute, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.adminRegForm = this.fb.group({
      name: ['', [Validators.required]],
      longitude: ['', [Validators.required, Validators.pattern("[+-]?([0-9]*[.])?[0-9]+")]],
      latitude: ['', [Validators.required, Validators.pattern("[+-]?([0-9]*[.])?[0-9]+")]],
      phone: ['', [Validators.required, Validators.pattern(new RegExp("[0-9 ]{12}"))]],
      email: ['', [Validators.required, Validators.pattern(new RegExp("\\w+@\\w+\\.\\w+"))]],
      siteUrl: ['', [Validators.required, Validators.pattern(new RegExp("https?://.+"))]],
    })
  }
  regForm() {
    this.route.queryParams.subscribe(params => {
      const userId = params['userId'];
      this.shelterService.addShelter(this.adminRegForm.value, userId).subscribe(
        (response: Shelter) => {
          console.log(response);
          this.adminRegForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          this.adminRegForm.reset();
        }
      );

    });
  }
  getShelterId() {
    this.route.queryParams.subscribe(params => {
      const userId = params['userId'];
      let user: User;
      this.userService.getUserById(userId).subscribe(
        (response: User) => {
          user = response;
          console.log(user);
          this.router.navigate(['account/:userId, shelterId'], {queryParams: {userId: userId, shelterId: user.shelterId}})
        }
      )
    });
  }
}
