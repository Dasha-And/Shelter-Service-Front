import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';
import { Bookings } from '../model/bookings';
import {User} from "../model/user";


@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http : HttpClient) { }

  public getBookings(sterilized?: boolean, species?: string): Observable<Bookings[]> {
    let params : any = {};
    console.log(species)
    if (species == "Вид") {
      species = undefined;
    }
    if (sterilized != undefined) {
      params.sterilized = sterilized;
    }
    if (species != undefined) {
      params.species = species;
    }
    return this.http.get<Bookings[]>(`${this.apiServerUrl}/bookings`, {params: params});
  }

  public getBookingsByShelter(id: number, sterilized?: boolean, species?: string): Observable<Bookings[]> {
    let params : any = {};
    console.log(species)
    if (species == "Вид") {
      species = undefined;
    }
    if (sterilized != undefined) {
      params.sterilized = sterilized;
    }
    if (species != undefined) {
      params.species = species;
    }
    console.log(params)
    return this.http.get<Bookings[]>(`${this.apiServerUrl}/bookings/${id}`, {params: params});
  }

  public getAge(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/age/${id}`);
  }

  public addBookings(bookings : Bookings): Observable<Bookings> {
    console.log(bookings);
    return this.http.post<Bookings>(`${this.apiServerUrl}/create_bookings`, bookings);
  }
  public getBookingsPage(id : number): Observable<Bookings> {
    let params = new HttpParams()
      .set('id', id);
    return this.http.get<Bookings>(`${this.apiServerUrl}/bookings_page`, {params: params})
  }

  public updateBookings(bookings : Bookings): Observable<Bookings> {
    return this.http.put<Bookings>(`${this.apiServerUrl}/update_bookings`, bookings);
  }
}
