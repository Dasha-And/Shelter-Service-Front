import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shelter } from '../model/shelter';
import {User} from "../model/user";


@Injectable({
  providedIn: 'root'
})
export class ShelterService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http : HttpClient) { }

  public getShelter(): Observable<Shelter[]> {
    return this.http.get<Shelter[]>(`${this.apiServerUrl}/shelters`);
  }
  public addShelter(shelter : Shelter, email : string): Observable<Shelter> {
    console.log(shelter);
    let params = new HttpParams()
      .set('email', email);
    return this.http.post<Shelter>(`${this.apiServerUrl}/create_shelter`, shelter, {params : params});
  }
  public getShelterPage(id : string): Observable<Shelter> {
    let params = new HttpParams()
      .set('id', id);
    return this.http.get<Shelter>(`${this.apiServerUrl}/shelter_page`, {params: params})
  }

  public updateShelter(shelter : Shelter, id : string): Observable<Shelter> {
    let params = new HttpParams()
      .set('id', id);
    return this.http.put<Shelter>(`${this.apiServerUrl}/update_shelter`, shelter, {params: params});
  }
}
