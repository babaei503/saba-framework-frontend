import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HireprocessComponent } from './hireprocess.component';
import { GstGetComponent } from './component/applicant/gst-get/gst-get.component';
import { GstAddComponent } from './component/applicant/gst-add/gst-add.component';
import { GstEditComponent } from './component/applicant/gst-edit/gst-edit.component';

const routes: Routes = [{
  path: '',
  component: HireprocessComponent,
  children: [
    {
      path: 'applicant',
      component: GstGetComponent,
    },
    {
      path: 'applicant/create',
      component: GstAddComponent
    },
    {
      path: 'applicant/edit/:id',
      component: GstEditComponent
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
export class HireprocessRoutingModule {

}

export const routedComponents = [
  HireprocessComponent,
  GstAddComponent,
  GstEditComponent,
  GstGetComponent
];
