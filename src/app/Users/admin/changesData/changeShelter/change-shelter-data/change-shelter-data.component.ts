import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {ShelterService} from "../../../../../service/shelter.service";
import {Shelter} from "../../../../../model/shelter";

@Component({
  selector: 'app-change-shelter-data',
  templateUrl: './change-shelter-data.component.html',
  styleUrls: ['./change-shelter-data.component.css']
})
export class ChangeShelterDataComponent implements OnInit {
  accountShelterChange!: FormGroup;
  public editShelter: Shelter | undefined;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private shelterService: ShelterService, private router: Router) { }
  flag: boolean = true;


  apply(value: string) {
    this.flag = value === "changeShelterAccounter" ? true : false;
  }
  ngOnInit(): void {
    this.accountShelterChange = this.fb.group({
      name: ['', [Validators.required]],
      longitude: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      latitude: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      phone: ['', [Validators.required, Validators.pattern(new RegExp("[0-9 ]{12}"))]],
      email: ['', [Validators.required, Validators.pattern(new RegExp("\\w+@\\w+\\.\\w+"))]],
      siteUrl: ['', [Validators.required, Validators.pattern(new RegExp("https?://.+"))]],
    })
    this.route.queryParams.subscribe(params => {
      const shelterId = params['shelterId'];
      this.shelterService.getShelterPage(shelterId).subscribe(
        (response : Shelter) => {
          this.editShelter = response;
        }
      )
    });
  }
  changeShelter() {
    this.route.queryParams.subscribe(params => {
      const shelterId = params['shelterId'];
      const userId = params['userId'];
      this.shelterService.updateShelter(this.accountShelterChange.value, shelterId).subscribe(
        (response: Shelter) => {
          console.log(response);
          this.router.navigate(['/account/:userId, shelterId'], {queryParams: {shelterId: shelterId, userId: userId}})
        }
      )
    });
  }
  goToChangeAccount() {
    this.route.queryParams.subscribe(params => {
      const userId = params['userId'];
      const shelterId = params['shelterId'];
      this.router.navigate(['/changeAccount/:shelterId, userId'], {queryParams: {userId: userId, shelterId: shelterId}});
      }
    )
  }
}
