import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import {UserLoginForm} from "../model/user.login.form";


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
    let params = new HttpParams()
      .set('userId', userId);
    return this.http.get<User>(`${this.apiServerUrl}/user`, {params: params});
  }

  public addUser(user : User): Observable<User> {
    console.log(user);
    return this.http.post<User>(`${this.apiServerUrl}/registration`, user);
  }

  public login(user : UserLoginForm): Observable<User> {
    // @ts-ignore
    return this.http.post<UserLoginForm>(`${this.apiServerUrl}/login`, user);
  }

  public updateUser(user : User, id : number): Observable<User> {
    let params = new HttpParams()
      .set('id', id);
    return this.http.put<User>(`${this.apiServerUrl}/update_user`, user, {params: params});
  }
  public deleteUser(userId : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/deleteUser/${userId}`);
  }
}
