import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit{
  logoUrl!: string;
  footerDate!: Date;
  friendNum!: Number;

  ngOnInit(): void {
    this.logoUrl = "../assets/pangolinLogo.png";
    this.footerDate = new Date();
    this.friendNum = 0;
  }
}
