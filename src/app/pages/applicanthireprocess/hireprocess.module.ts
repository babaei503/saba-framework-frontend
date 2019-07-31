import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { HireprocessRoutingModule, routedComponents } from './hireprocess-routing.module';
import { CommonModule} from '../../commoncomponent/common.module'


@NgModule({
  imports: [
    ThemeModule,
    HireprocessRoutingModule,
    CommonModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class HireprocessModule { }
