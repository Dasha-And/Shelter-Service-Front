import { Component, OnInit } from '@angular/core';
import {Shelter} from "../model/shelter";
import {HttpErrorResponse} from "@angular/common/http";
import {ShelterService} from "../service/shelter.service";
import {Animal} from "../model/animal";
import {AnimalService} from "../service/animal.service";
import {timeout} from "rxjs/operators";
import { Router } from '@angular/router';



declare const L: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public kind = ['Вид','Кіт','Собака'];
  public years = ['Вік','1','2','3','4','5','6','7','8','9','10','11'];
  public city = ['Місто','Харків','Київ','Одеса','Дніпро','Львів','Херсон','Полтава','Миколаїв','Луганськ','Суми']
  public selectedKind = '';
  public selectedKindAll = '';
  public selectedYears = '';
  public selectedCity = '';
  public selectedSterilization : boolean | undefined;
  public selectedSterilizationAll : boolean | undefined;
  public shelters: Shelter[] = [];
  public animalsByShelter : Animal[] = [];
  public allAnimals : Animal[] = [];
  public selectedShelter! : Shelter;
  public selected = false;
  public allShelters = false;
  constructor(private shelterService : ShelterService, private animalService : AnimalService, private router: Router) {
    this.selectedKind = this.kind[0];
    this.selectedYears = this.years[0];
    this.selectedCity = this.city[0];
    this.selectedKindAll = this.kind[0];
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
  changeKindAll(item:any){
    this.selectedKindAll = item;
  }
  changeYears(item:any){
    this.selectedYears = item;
  }
  changeCity(item:any){
    this.selectedCity = item;
  }

  changeSterilized(item:any) {
    this.selectedSterilization = item;
  }

  changeSterilizedAll(item:any) {
    this.selectedSterilizationAll = item;
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
      this.animalService.getAnimalsByShelter(this.selectedShelter?.id).subscribe(
        (response : Animal[]) => {
          this.animalsByShelter = response;
        }
      )
      this.selected = true;
      this.allShelters = false;
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

  public getAnimals() {
    // var species: string = (<HTMLInputElement>document.getElementById("dropdownBasic4")).value;
    // console.log(species)
    this.animalService.getAnimalsByShelter(this.selectedShelter?.id, this.selectedSterilization, this.selectedKind).subscribe(
      (response : Animal[]) => {
            console.log(response)
            this.animalsByShelter = response;

      }
    )
  }

  goToFullInfo(id : number) {
    this.router.navigate(['/fullInfoAnimal/:id'], {queryParams: {id: id}});
  }

  getShelter(id:number) : string{
    var name = '';
    this.shelterService.getShelterPage(id).subscribe(
      (response : Shelter) => {
            console.log(response)
            name =  response.name;
      }
    )
    return name;
  }

  searchAllShelters() {
    this.allShelters = true;
    this.animalService.getAnimals(this.selectedSterilizationAll, this.selectedKindAll).subscribe(
      (response : Animal[]) => {
            console.log(response)
            response.forEach( (value) => {
              this.shelterService.getShelterPage(value.shelterId).subscribe(
                (response : Shelter) => {
                      console.log(response)
                      value.shelterName =  response.name;
                }
              )
            })
            this.allAnimals = response;
      }
    )
  }
}
