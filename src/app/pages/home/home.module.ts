import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { HomeRoutingModule, routedComponents } from './home-routing.module';


@NgModule({
  imports: [
    ThemeModule,
    HomeRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class HomeModule { }
