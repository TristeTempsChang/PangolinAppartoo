import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userModel } from './models/user.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  constructor(private http: HttpClient) {

  }

  userTest() {
    return this.http.get<any>('http://localhost:3000/api/user').pipe(
      map(response => response.data as userModel[])
    ).subscribe(userData => {
      console.log(userData)
      userData.forEach(element => {
        console.log(element.username);
        console.log(element.password);
      })
    });
  }
}
