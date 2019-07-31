import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { SecurityRoutingModule, routedComponents } from './Security-routing.module';


@NgModule({
  imports: [
    ThemeModule,
    SecurityRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class SecurityModule { }
