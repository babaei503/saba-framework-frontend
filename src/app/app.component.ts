/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';


import { TokenStorageService } from './security/auth/token-storage.service';


@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
},
)


export class AppComponent implements OnInit {


  private roles: string[];
  private authority: string;


  constructor(private analytics: AnalyticsService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {

    this.analytics.trackPageViews();
    if (this.tokenStorage.getToken()) {
     this.roles = this.tokenStorage.getAuthorities();
     this.roles.every(role => {
       if (role === 'ROLE_ADMIN') {
         this.authority = 'admin';
         return false;
       } else if (role === 'ROLE_PM') {
         this.authority = 'pm';
         return false;
       }
       this.authority = 'user';
       return true;
     });
    }
 }


}





