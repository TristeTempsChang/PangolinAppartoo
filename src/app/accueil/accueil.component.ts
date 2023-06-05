import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  accueilUrl!: string;

  ngOnInit(): void {
    this.accueilUrl = "../assets/accueil_image.avif"
  }
}
