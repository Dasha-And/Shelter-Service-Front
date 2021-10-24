import { Component, OnInit } from '@angular/core';
import {Shelter} from "../model/shelter";
import {HttpErrorResponse} from "@angular/common/http";
import {ShelterService} from "../service/shelter.service";
declare const L: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public shelters: Shelter[] = [];

  constructor(private shelterService : ShelterService) { }

  ngOnInit(): void {
    this.getShelters()
  }

  public getShelters(): void {
    let map = L.map('map').setView([50.00151883707298, 36.23488272651544], 13);
    L.tileLayer('https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=IHi7no8DxWB8RFhDySRviophJJUk5J7eQV5CrAvu4oWjjNed0Oa7RdSQxPCVtt5Q', {
      attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 0,
      maxZoom: 22,
      subdomains: 'abcd',
      accessToken: 'IHi7no8DxWB8RFhDySRviophJJUk5J7eQV5CrAvu4oWjjNed0Oa7RdSQxPCVtt5Q'
    }).addTo(map);
    this.shelterService.getShelter().subscribe(
      (response : Shelter[]) => {
        this.shelters = response;
        for (let i = 0; i < response.length; i++) {
          let marker = L.marker([response[i].latitude, response[i].longitude]).addTo(map);
          marker.bindPopup(response[i].name);
        }
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
