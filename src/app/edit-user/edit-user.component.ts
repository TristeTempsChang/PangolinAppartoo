import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService ,MessageService } from 'primeng/api';
import { ConnexionService } from '../connexion.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class EditUserComponent {

  userId: any;
  email: any;
  status: any;
  prenom: any;
  nom: any;
  adresse: any;
  ville: any;
  pays: any;
  codePostal: any;
  bio: any;
  updateForm!: FormGroup;

  constructor(private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private conService: ConnexionService,
              private authGuard: AuthGuard,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.userId = this.conService.getId();
    this.conService.getUserById(this.userId).subscribe((data) => {
      this.status = data.status;
      this.email = data.email;
      this.prenom = data.prenom;
      this.nom = data.nom;
      this.adresse = data.adresse;
      this.ville = data.ville;
      this.pays = data.pays;
      this.codePostal = data.codePostal;
      this.bio = data.bio;
  })
    this.updateForm = this.formBuilder.group({
      email: [''],
      prenom: [''],
      nom: [''],
      adresse: [''],
      ville: [''],
      pays: [''],
      codePostal: [''],
      bio: [''],
    });
  }

  onSubmit(){
    const emailForm = this.updateForm.value.email;
    var validRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if(!validRegex.test(emailForm)) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Adresse mail non valide !" });
    } else {
      this.conService.updateUser(this.userId, this.updateForm.value)
      window.location.href = '/user';
    }
  }

    onDelete(){
      this.confirmationService.confirm({
        message: 'Voulez-vous vraiment supprimer votre compte ?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Oui',
        rejectLabel: 'Non',
        accept: () => {
          this.authGuard.authenticate = false;
          console.log(this.authGuard.authenticate);
          this.conService.deleteUser(this.userId);
          this.conService.removeToken();
          this.conService.removeID();
          window.location.href = '';
        },
        reject: () => {

        }
    });
  }

}
