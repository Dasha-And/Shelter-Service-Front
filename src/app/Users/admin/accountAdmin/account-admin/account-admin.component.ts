import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ShelterService} from "../../../../service/shelter.service";
import {Shelter} from "../../../../model/shelter";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../../../service/user.service";
import {User} from "../../../../model/user";

@Component({
  selector: 'app-account-admin',
  templateUrl: './account-admin.component.html',
  styleUrls: ['./account-admin.component.css']
})
export class AccountAdminComponent implements OnInit {

  public shelter! : Shelter;
  public user! : User;
  constructor(private route: ActivatedRoute, private shelterService : ShelterService, private userService : UserService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const shelterId = params['shelterId'];
      const userId = params['userId'];
      console.log(shelterId);
      this.shelterService.getShelterPage(shelterId).subscribe(
        (response : Shelter) => {
          this.shelter = response;
        },
        (error : HttpErrorResponse) => {
          alert(error.message);
        }
      );
      this.userService.getUserById(userId).subscribe(
        (response : User) => {
          this.user = response;
        },
        (error : HttpErrorResponse) => {
          alert(error.message);
        }
      )
    });
  }
  routeToForms(): void {
    this.route.queryParams.subscribe(params => {
      const shelterId = params['shelterId'];
      const userId = params['userId'];
      this.router.navigate(['/changeShelter/:shelterId, userId'], {queryParams: {shelterId: shelterId, userId: userId}});

    });
  }

  goToShelter() {
    this.route.queryParams.subscribe(params => {
      const shelterId = params['shelterId'];
      this.router.navigate(['/shelter/:shelterId'], {queryParams: {shelterId: shelterId}});

    });
  }
  // public onUpdateShelter(shelter: Sport): void {
  //   this.sportService.updateSport(sport).subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.getSports();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }
}
