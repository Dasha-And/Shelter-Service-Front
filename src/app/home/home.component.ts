import { Component, OnInit } from '@angular/core';
import {Shelter} from "../model/shelter";
import {HttpErrorResponse} from "@angular/common/http";
import {ShelterService} from "../service/shelter.service";



declare const L: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public kind = ['Вид','Коти','Cобаки'];
  public years = ['Вік','1','2','3','4','5','6','7','8','9','10','11'];
  public city = ['Місто','Харків','Київ','Одеса','Дніпро','Львів','Херсон','Полтава','Миколаїв','Луганськ','Суми']
  public selectedKind = '';
  public selectedYears = '';
  public selectedCity = '';
  public shelters: Shelter[] = [];
  public selectedShelter : Shelter | undefined;

  constructor(private shelterService : ShelterService) {
    this.selectedKind = this.kind[0];
    this.selectedYears = this.years[0];
    this.selectedCity = this.city[0];
  }

  ngOnInit(): void {
    this.getShelters()

  }
  markerOnClick(shelter:Shelter) {
    this.selectedShelter = shelter;
  }
  changeKind(item:any){
    this.selectedKind = item;
  }
  changeYears(item:any){
    this.selectedYears = item;
  }
  changeCity(item:any){
    this.selectedCity = item;
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

    const groupClick = (event: { layer: { test: Shelter; }; }) =>{
      this.selectedShelter = event?.layer.test;
    }
    // @ts-ignore
    var markersLayer = new L.featureGroup().addTo(map).on('click', groupClick);
    map.addLayer(markersLayer);
    this.shelterService.getShelter().subscribe(
      (response : Shelter[]) => {
        this.shelters = response;
        var shelter : Shelter;
        for (let i = 0; i < response.length; i++) {
          shelter = response[i];
          let marker = L.marker([response[i].latitude, response[i].longitude]).addTo(markersLayer);
          marker.test = shelter;
          console.log(this.selectedShelter);
          marker.bindPopup(response[i].name);
        }

      },

      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
