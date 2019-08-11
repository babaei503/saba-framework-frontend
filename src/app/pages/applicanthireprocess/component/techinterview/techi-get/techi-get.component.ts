import { Component, OnInit } from '@angular/core';
import TaskRef from '../../../model/TaskRef';
import { ApplicantHireProcessService } from '../../../service/applicanthireprocessservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'techi-get',
  templateUrl: './techi-get.component.html',
  styleUrls: ['./techi-get.component.scss']
})
export class TechiGetComponent implements OnInit {

  taskrefs: TaskRef[];
  assigneetaskrefs: TaskRef[];

  constructor(
    private bs: ApplicantHireProcessService,
    private router: Router) { }

  ngOnInit() {

    this.bs
      .getTechInterviewTasks()
      .subscribe((data: TaskRef[]) => {
        this.taskrefs = data;
        console.log(this.taskrefs);
    });

    this.bs
    .getTechIntviewTaskAssignee()
    .subscribe((data: TaskRef[]) => {
      this.assigneetaskrefs = data;
      console.log(this.assigneetaskrefs);
    });

  }

  claim(taskid) {
    this.bs.claimTechIntviewTask(taskid).subscribe(res => {
      console.log('Claim');
      this.ngOnInit();
    });
  }

  dotask(taskid){

    console.log(taskid);
    this.router.navigate(['/pages/hireprocess/dotechitask/',taskid]);
  }
  
}