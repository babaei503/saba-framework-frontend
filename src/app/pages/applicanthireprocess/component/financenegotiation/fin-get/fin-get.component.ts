import { Component, OnInit } from '@angular/core';
import TaskRef from '../../../model/TaskRef';
import { ApplicantHireProcessService } from '../../../service/applicanthireprocessservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fin-get',
  templateUrl: './fin-get.component.html',
  styleUrls: ['./fin-get.component.scss']
})
export class FinGetComponent implements OnInit {

  taskrefs: TaskRef[];
  assigneetaskrefs: TaskRef[];

  constructor(
    private bs: ApplicantHireProcessService,
    private router: Router) { }

  ngOnInit() {

    this.bs
      .getFinanceNegotiationTasks()
      .subscribe((data: TaskRef[]) => {
        this.taskrefs = data;
        console.log(this.taskrefs);
    });

    this.bs
    .getFinanceNegotiationTaskAssignee()
    .subscribe((data: TaskRef[]) => {
      this.assigneetaskrefs = data;
      console.log(this.assigneetaskrefs);
    });

  }

  claim(taskid) {
    this.bs.claimFinanceNegotiationTask(taskid).subscribe(res => {
      console.log('Claim');
      this.ngOnInit();
    });
  }

  dotask(taskid){

    console.log(taskid);
    this.router.navigate(['/pages/hireprocess/dofintask/',taskid]);
  }
  
}