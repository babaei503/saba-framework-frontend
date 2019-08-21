import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { HomeRoutingModule, routedComponents } from './home-routing.module';
import {SlideshowModule} from 'ng-simple-slideshow';


@NgModule({
  imports: [
    ThemeModule,
    HomeRoutingModule,
    SlideshowModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class HomeModule { }
