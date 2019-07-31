import { NgModule } from '@angular/core';

import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { DialogDeletePromptComponent} from './dialog-delete-prompt/dialog-delete-prompt.component'

const components = [
    DialogDeletePromptComponent,
];

const ENTRY_COMPONENTS = [
  DialogDeletePromptComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
  ],
  exports: [
    ...components,
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
  providers: [],
})
export class CommonModule { }
