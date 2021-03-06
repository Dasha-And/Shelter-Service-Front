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

  public getBookingsByAnimal(animalId: number): Observable<Bookings[]> {
    let params : any = {};
    params.animalId = animalId;
    console.log(params)
    return this.http.get<Bookings[]>(`${this.apiServerUrl}/bookings`, {params: params});
  }


  public addBookings(bookings : Bookings): Observable<Bookings> {
    console.log(bookings);
    return this.http.post<Bookings>(`${this.apiServerUrl}/create_booking`, bookings);
  }

}
