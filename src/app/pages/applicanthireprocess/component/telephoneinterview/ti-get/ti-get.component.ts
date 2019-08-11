import { Component, OnInit } from '@angular/core';
import TaskRef from '../../../model/TaskRef';
import { ApplicantHireProcessService } from '../../../service/applicanthireprocessservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ti-get',
  templateUrl: './ti-get.component.html',
  styleUrls: ['./ti-get.component.scss']
})
export class TiGetComponent implements OnInit {

  taskrefs: TaskRef[];
  assigneetaskrefs: TaskRef[];

  constructor(
    private bs: ApplicantHireProcessService,
    private router: Router) { }

  ngOnInit() {

    this.bs
      .getPhoneInterviewTasks()
      .subscribe((data: TaskRef[]) => {
        this.taskrefs = data;
        console.log(this.taskrefs);
    });

    this.bs
    .getPhoneIntviewTaskAssignee()
    .subscribe((data: TaskRef[]) => {
      this.assigneetaskrefs = data;
      console.log(this.assigneetaskrefs);
    });

  }

  claim(taskid) {
    this.bs.claimPhoneIntviewTask(taskid).subscribe(res => {
      console.log('Claim');
      this.ngOnInit();
    });
  }

  dotask(taskid){

    console.log(taskid);
    this.router.navigate(['/pages/hireprocess/dotitask/',taskid]);
  }
  
}