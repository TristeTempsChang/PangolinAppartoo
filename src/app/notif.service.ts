import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  showNotification: boolean = false;

  constructor() { }
}
