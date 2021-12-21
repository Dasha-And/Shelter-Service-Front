import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';
import { AnimalVaccination } from '../model/animalVaccination';
import {User} from "../model/user";


@Injectable({
  providedIn: 'root'
})
export class AnimalVaccinationService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http : HttpClient) { }

  public getAnimalVaccinationByAnimal(animalId: number): Observable<AnimalVaccination[]> {
    let params : any = {};
    params.animalId = animalId;
    console.log(params)
    return this.http.get<AnimalVaccination[]>(`${this.apiServerUrl}/animal_vaccinations`, {params: params});
  }


  public addAnimalVaccination(animalVaccination : AnimalVaccination): Observable<AnimalVaccination> {
    console.log(animalVaccination);
    return this.http.post<AnimalVaccination>(`${this.apiServerUrl}/create_animal_vaccination`, animalVaccination);
  }

}
