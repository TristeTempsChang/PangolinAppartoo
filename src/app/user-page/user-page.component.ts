import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../connexion.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { NotifService } from '../notif.service';
import { userModel } from '../models/user.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit{

  logoUrl!: string;
  footerDate!: Date;
  friendNum!: Number;
  visible!: boolean;
  userData!: userModel[];

  userId: any;
  username: any;
  password: any;
  email: any;
  status: any;
  prenom: any;
  nom: any;
  adresse: any;
  ville: any;
  pays: any;
  codePostal: any;
  bio: any;
  friends: any;

  constructor(private conService: ConnexionService,
              private router: Router,
              public notifService: NotifService,
              private authGuard: AuthGuard){
          this.userId = this.conService.getId();
          this.conService.getUserById(this.userId).subscribe((data) => {
            this.username = data.username;
            this.password = data.password,
            this.status = data.status;
            this.email = data.email;
            this.prenom = data.prenom;
            this.nom = data.nom;
            this.adresse = data.adresse;
            this.ville = data.ville;
            this.pays = data.pays;
            this.codePostal = data.codePostal;
            this.bio = data.bio;
            this.friends = data.friends;
        })

        this.conService.getUser().subscribe((data) => {
          this.userData = data.filter(user => user.friends.includes(this.userId));
          console.log(data)
        })
  }

  ngOnInit(): void {
    this.logoUrl = "../assets/pangolinLogo.png";
    this.footerDate = new Date();
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  guerrier(){
    const formData = {
      _id: this.userId,
      username: this.username,
      password: this.password,
      status: "Guerrier",
      email: this.email,
      prenom: this.prenom,
      nom: this.nom,
      adresse: this.adresse,
      ville: this.ville,
      pays: this.pays,
      codePostal: this.codePostal,
      bio: this.bio,
      friends: this.friends
    };

    this.conService.updateUser(this.userId, formData)
    window.location.href = '/user';
  }

  Alchimiste(){
    const formData = {
      _id: this.userId,
      username: this.username,
      password: this.password,
      status: "Alchimiste",
      email: this.email,
      prenom: this.prenom,
      nom: this.nom,
      adresse: this.adresse,
      ville: this.ville,
      pays: this.pays,
      codePostal: this.codePostal,
      bio: this.bio,
      friends: this.friends
    };

    this.conService.updateUser(this.userId, formData)
    window.location.href = '/user';
  }

  Sorcier(){
    const formData = {
      _id: this.userId,
      username: this.username,
      password: this.password,
      status: "Sorcier",
      email: this.email,
      prenom: this.prenom,
      nom: this.nom,
      adresse: this.adresse,
      ville: this.ville,
      pays: this.pays,
      codePostal: this.codePostal,
      bio: this.bio,
      friends: this.friends
    };

    this.conService.updateUser(this.userId, formData)
    window.location.href = '/user';
  }

  Espions(){
    const formData = {
      _id: this.userId,
      username: this.username,
      password: this.password,
      status: "Espions",
      email: this.email,
      prenom: this.prenom,
      nom: this.nom,
      adresse: this.adresse,
      ville: this.ville,
      pays: this.pays,
      codePostal: this.codePostal,
      bio: this.bio,
      friends: this.friends
    };

    this.conService.updateUser(this.userId, formData)
    window.location.href = '/user';
  }

  Enchanteur(){
    const formData = {
      _id: this.userId,
      username: this.username,
      password: this.password,
      status: "Enchanteur",
      email: this.email,
      prenom: this.prenom,
      nom: this.nom,
      adresse: this.adresse,
      ville: this.ville,
      pays: this.pays,
      codePostal: this.codePostal,
      bio: this.bio,
      friends: this.friends
    };

    this.conService.updateUser(this.userId, formData)
    window.location.href = '/user';
  }

  deconnexion() {
    this.conService.removeToken();
    this.conService.removeID();
    this.authGuard.authenticate = false;
    window.location.href = '';
  }

    showFriend() {
      this.visible = true;
  }

  deleteFriend(friendId: string){
    this.notifService.removeFriend(this.userId, friendId);
    window.location.href = '/user';
  }
}
