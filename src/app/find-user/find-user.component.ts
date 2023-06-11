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

  userData: userModel[]=[];
  userId: any;

  constructor(private connexionService: ConnexionService,
              private confirmationService: ConfirmationService,
              private notifService: NotifService,
              private messageService: MessageService){
      this.connexionService.getUser().subscribe((data) => {
        console.log(data);
        this.userData = data;
      })
  }

  AddFriend() {
    this.confirmationService.confirm({
        message: 'Voulez-vous ajouter ce pangolin dans votre liste de pangolins ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.notifService.showNotification = true;
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
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
}
