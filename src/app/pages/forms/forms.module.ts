import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule, routedComponents } from './forms-routing.module';
import { ButtonsModule } from './buttons/buttons.module';
import { CommonModule} from '../../commoncomponent/common.module'


@NgModule({
  imports: [
    ThemeModule,
    FormsRoutingModule,
    ButtonsModule,
    CommonModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class FormsModule { }
