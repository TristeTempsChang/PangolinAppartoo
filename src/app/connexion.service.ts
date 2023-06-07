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
    
  }
}
