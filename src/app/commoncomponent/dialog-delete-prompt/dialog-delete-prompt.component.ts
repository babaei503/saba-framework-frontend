import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-delete-prompt',
  templateUrl: 'dialog-delete-prompt.component.html',
  styleUrls: ['dialog-delete-prompt.component.scss'],
})
export class DialogDeletePromptComponent {

  constructor(protected ref: NbDialogRef<DialogDeletePromptComponent>) {}

  cancel() {
    this.ref.close("No");
  }

  submit() {
    this.ref.close("Yes");
  }
}
