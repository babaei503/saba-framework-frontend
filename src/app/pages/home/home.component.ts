import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageSources : string[]; 
  constructor(private router: Router) {
    this.imageSources = new Array("../../../assets/images/Tehran-Iran.jpg",
                                  "../../../assets/images/tehran1.jpg",
                                  "../../../assets/images/esfahan.jpg",
                                  "../../../assets/images/esfahan1.jpg",
                                  "../../../assets/images/esfahan2.jpg",
                                  "../../../assets/images/Shiraz.jpg")
   }

  ngOnInit() {
    
  }
}
