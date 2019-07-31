import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../security/login/login.component';
import { RegisterComponent } from '../security/register/register.component';
import { LogoutComponent } from '../security/logout/logout.component';
import { SecurityComponent } from './security.component';

const routes: Routes = [{
  path: '',
  component: SecurityComponent,
  children: [
    {
        path: 'login',
        component: LoginComponent
      },{ 
        path: 'signup',
        component: RegisterComponent
      },{ 
        path: 'logout',
        component: LogoutComponent
      },
  ],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class SecurityRoutingModule {

}

export const routedComponents = [
  SecurityComponent,
  LoginComponent,
  RegisterComponent,
  LogoutComponent,
];
