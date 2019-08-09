import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HireprocessComponent } from './hireprocess.component';
import { GstGetComponent } from './component/applicant/gst-get/gst-get.component';
import { GstAddComponent } from './component/applicant/gst-add/gst-add.component';
import { GstEditComponent } from './component/applicant/gst-edit/gst-edit.component';
import { JobgetComponent } from './component/job/job-get/job-get.component';
import { TiGetComponent } from './component/telephoneinterview/ti-get/ti-get.component';
import { TiDoComponent } from './component/telephoneinterview/ti-do/ti-do.component';

const routes: Routes = [{
  path: '',
  component: HireprocessComponent,
  children: [
    {
      path: 'applicant',
      component: GstGetComponent,
    },
    {
      path: 'applicant/create/:jobid',
      component: GstAddComponent
    },
    {
      path: 'applicant/edit/:id',
      component: GstEditComponent
    },
    {
      path: 'jobs/:location/:title',
      component: JobgetComponent,
    },
    {
      path: 'telephoneinterview',
      component: TiGetComponent,
    },
    {
      path: 'dotitask/:taskid',
      component: TiDoComponent,
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
  GstGetComponent,
  GstEditComponent,
  JobgetComponent,
  TiGetComponent,
  TiDoComponent,
];
