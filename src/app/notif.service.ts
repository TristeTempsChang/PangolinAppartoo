import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  showNotification: boolean = false;

  constructor(private http: HttpClient) { }

  AddFriend(user_id: string, friendId: string){
    const body = { friendId: friendId }
    return this.http.post<any>('http://localhost:3000/api/addFriend/' + user_id, body).subscribe((resultData: any) => {
        console.log(resultData)
    });
  }

  removeFriend(user_id: string, friendId: string) {
    return this.http.delete<any>(`http://localhost:3000/api/removeFriend/${user_id}/${friendId}`)
      .subscribe((resultData: any) => {
        console.log(resultData);
      });
  }
}
