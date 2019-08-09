import { Component, OnInit } from '@angular/core';
import TaskRef from '../../../model/TaskRef';
import Applicant from '../../../model/Applicant';
import Job from '../../../model/Job';
import { ApplicantHireProcessService } from '../../../service/applicanthireprocessservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ti-get',
  templateUrl: './ti-do.component.html',
  styleUrls: ['./ti-do.component.scss']
})
export class TiDoComponent implements OnInit {

  assigneetaskref: TaskRef;
  applicant: Applicant;

  constructor(
    private bs: ApplicantHireProcessService,
    private dialogService: NbDialogService,
    private route: ActivatedRoute) { 
      this.assigneetaskref = new TaskRef();
      this.applicant = new Applicant();
      this.applicant.applicant_job = new Job();
    }

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.bs
        .getTaskByIDAssignee(params['taskid'])
        .subscribe((data: TaskRef) => {
          this.assigneetaskref = data;
          console.log(this.assigneetaskref);
      });

      this.bs
      .getProcessVarsByTaskIDAssignee(params['taskid'])
      .subscribe((data: any) => {
        console.log(data);
        this.applicant = data;
      });


    });
 }

  completetask(taskid){

    console.log(taskid);

  }

  rejecttask(taskid){

    console.log(taskid);

  }
  
}