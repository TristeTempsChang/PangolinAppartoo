import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../guard/auth.guard';
import { ConnexionService } from '../connexion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  logoUrl!: string;
  authenticate! : boolean;
  userId: any;
  username: any;

  constructor(private conService: ConnexionService,
              private authGuard: AuthGuard){
    this.authenticate = this.authGuard.getAuth();
    this.userId = this.conService.getId();
          this.conService.getUserById(this.userId).subscribe((data) => {
            this.username = data.username;
    })
  }

  ngOnInit(): void {
    this.logoUrl = "../assets/pangolinLogo.png";
  }

}
