import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';
import { Animal } from '../model/animal';
import {User} from "../model/user";


@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http : HttpClient) { }

  public getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiServerUrl}/animals`);
  }

  public getAnimalsByShelter(id: number, sterilized?: boolean, species?: string): Observable<Animal[]> {
    let params : any = {};
    console.log(species)
    if (species == "Вид") {
      species = undefined;
    }
    if (sterilized != undefined) {
      params.sterilized = sterilized;
    }
    if (species != undefined) {
      console.log("ok")
      params.species = species;
    }
    console.log(params)
    return this.http.get<Animal[]>(`${this.apiServerUrl}/animals/${id}`, {params: params});
  }

  public getAge(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/age/${id}`);
  }

  public addAnimal(animal : Animal): Observable<Animal> {
    console.log(animal);
    return this.http.post<Animal>(`${this.apiServerUrl}/create_animal`, animal);
  }
  public getAnimalPage(id : number): Observable<Animal> {
    let params = new HttpParams()
      .set('id', id);
    return this.http.get<Animal>(`${this.apiServerUrl}/animal_page`, {params: params})
  }

  public updateAnimal(animal : Animal): Observable<Animal> {
    return this.http.put<Animal>(`${this.apiServerUrl}/update_animal`, animal);
  }
}
