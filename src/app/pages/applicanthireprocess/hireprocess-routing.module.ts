import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HireprocessComponent } from './hireprocess.component';
import { GstGetComponent } from './component/applicant/gst-get/gst-get.component';
import { GstAddComponent } from './component/applicant/gst-add/gst-add.component';
import { GstEditComponent } from './component/applicant/gst-edit/gst-edit.component';
import { JobgetComponent } from './component/job/job-get/job-get.component';
import { TiGetComponent } from './component/telephoneinterview/ti-get/ti-get.component';
import { TiDoComponent } from './component/telephoneinterview/ti-do/ti-do.component';
import { TechiGetComponent } from './component/techinterview/techi-get/techi-get.component';
import { TechiDoComponent } from './component/techinterview/techi-do/techi-do.component';
import { FinGetComponent } from './component/financenegotiation/fin-get/fin-get.component';
import { FinNDoComponent } from './component/financenegotiation/fin-do/fin-do.component';

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
    {
      path: 'techinterview',
      component: TechiGetComponent,
    },
    {
      path: 'dotechitask/:taskid',
      component: TechiDoComponent,
    },
    {
      path: 'financenegotiation',
      component: FinGetComponent,
    },
    {
      path: 'dofintask/:taskid',
      component: FinNDoComponent,
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
  TechiGetComponent,
  TechiDoComponent,
  FinGetComponent,
  FinNDoComponent,
];
