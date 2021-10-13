import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http : HttpClient) { }

  public getUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/users`);
  }

  public getUserById(userId : number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/${userId}`);
  }

  public addUser(user : User): Observable<User> {
    console.log(user);
    return this.http.post<User>(`${this.apiServerUrl}/registration`, user);
  }

  public updateUser(user : User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/updateUser`, user);
  }

  public deleteUser(userId : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/deleteUser/${userId}`);
  }
}
