import { Component } from '@angular/core';
import { userModel } from '../models/user.model';
import { ConnexionService } from '../connexion.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { NotifService } from '../notif.service';

@Component({
  selector: 'app-find-user',
  templateUrl: './find-user.component.html',
  styleUrls: ['./find-user.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class FindUserComponent {

  userData!: userModel[];
  userId: any;
  friendId: any;
  friendOfCurrentUser: any;

  constructor(private connexionService: ConnexionService,
              private confirmationService: ConfirmationService,
              private notifService: NotifService,
              private messageService: MessageService){
      this.userId = this.connexionService.getId();
      this.connexionService.getUserById(this.userId).subscribe((dataCurrent) => {
        this.friendOfCurrentUser = dataCurrent.friends;
        console.log(this.friendOfCurrentUser.includes(this.userId));
      })
      this.connexionService.getUser().subscribe((data) => {
        this.userData = data.filter(user => !user.friends.includes(this.userId));
        console.log(data)
      })
  }

  AddFriend(friendId: string) {
    this.confirmationService.confirm({
        message: 'Voulez-vous ajouter ce pangolin dans votre liste de pangolins ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.notifService.showNotification = true;
          console.log(friendId)
          this.notifService.AddFriend(this.userId, friendId);
          this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Utilisateur ajouté !' });
          window.location.href = '/user/findFriend';
        },
        reject: () => {
          
        }
    });
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  isCurrentUser(user: userModel): boolean {
    return user._id === this.userId;
  }
}
