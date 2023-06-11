import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userModel } from './models/user.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  private tokenKey = 'token';
  private userIdNumber = 'userId';

  constructor(private http: HttpClient) {

  }

  setId(userId: any): void {
    localStorage.setItem(this.userIdNumber, userId);
  }

  getId(): any | null {
    return localStorage.getItem(this.userIdNumber);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  removeID(): void {
    localStorage.removeItem(this.userIdNumber);
  }

  getUser() {
    return this.http.get<any>('http://localhost:3000/api/user').pipe(
      map(response => { 
        return response.data})) as Observable<userModel[]>;
  }

  getUserById(user_id: any) {
    return this.http.get<any>('http://localhost:3000/api/userById/' + user_id).pipe(
      map(response => { 
        return response.data})) as Observable<userModel>;
  }

  updateUser(user_id: string, modify: userModel){
    return this.http.post<any>('http://localhost:3000/api/userById/' + user_id, modify).subscribe((resultData: any) => {
        console.log(resultData)
    });
  }

  deleteUser(user_id: string){
    return this.http.delete<any>('http://localhost:3000/api/userById/' + user_id).subscribe((resultData: any) => {
        console.log(resultData)
    });
  }
}
