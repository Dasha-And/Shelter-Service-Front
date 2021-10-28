import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Shelter} from "../../../../../model/shelter";
import {ActivatedRoute, Router} from "@angular/router";
import {ShelterService} from "../../../../../service/shelter.service";
import {UserService} from "../../../../../service/user.service";
import {User} from "../../../../../model/user";

@Component({
  selector: 'app-change-account-data',
  templateUrl: './change-account-data.component.html',
  styleUrls: ['./change-account-data.component.css']
})
export class ChangeAccountDataComponent implements OnInit {
  accountAdminData!: FormGroup;
  editUser : User | undefined;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private userService: UserService, private router: Router) { }
  flag: boolean = true;


  apply(value: string) {
    this.flag = value === "changeShelterAccounter" ? true : false;
  }
  ngOnInit(): void {
    this.accountAdminData = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("[A-Za-zА-Яа-яЁёІіЇїЄє]{2,20}")]],
      surname: ['', [Validators.required, Validators.pattern("[A-Za-zА-Яа-яЁёІіЇїЄє]{2,20}")]],
      phone: ['', [Validators.required, Validators.pattern(new RegExp("[0-9 ]{12}"))]],
      email: ['', [Validators.required, Validators.pattern(new RegExp("\\w+@\\w+\\.\\w+"))]],
      password: ['', [Validators.required, Validators.pattern("[A-Za-z0-9@!_]{6,}")]],
      role: ['',],
      shelterId: ['',],
    })
    this.route.queryParams.subscribe(params => {
      const userId = params['userId'];
      this.userService.getUserById(userId).subscribe(
        (response : User) => {
          console.log(response);
          this.editUser = response;
        }
      )
    });
  }
  change(): void {
    this.route.queryParams.subscribe(params => {
      const shelterId = params['shelterId'];
      const userId = params['userId'];
      this.userService.updateUser(this.accountAdminData.value, userId).subscribe(
        (response: User) => {
          console.log(response);
          this.router.navigate(['/account/:userId, shelterId'], {queryParams: {shelterId: shelterId, userId: userId}})
        }
      )
    });
  }

  changeShelter(): void {
    this.route.queryParams.subscribe(params => {
        const shelterId = params['shelterId'];
        const userId = params['userId'];
        this.router.navigate(['/changeShelter/:shelterId, userId'], {queryParams: {shelterId: shelterId, userId: userId}});
      }
    )
  }
}
