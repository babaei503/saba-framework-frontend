import { Component, OnInit } from '@angular/core';
import TaskRef from '../../../model/TaskRef';
import { ApplicantHireProcessService } from '../../../service/applicanthireprocessservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { DialogDeletePromptComponent } from '../../../../../commoncomponent/dialog-delete-prompt/dialog-delete-prompt.component';

@Component({
  selector: 'ti-get',
  templateUrl: './ti-get.component.html',
  styleUrls: ['./ti-get.component.scss']
})
export class TiGetComponent implements OnInit {

  taskrefs: TaskRef[];

  constructor(
    private bs: ApplicantHireProcessService,
    private dialogService: NbDialogService) { }

  ngOnInit() {

    this.bs
      .getPhoneInterviewTasks()
      .subscribe((data: TaskRef[]) => {
        this.taskrefs = data;
        console.log(this.taskrefs);
    });
  }

  claim(taskid) {
    this.bs.claim(taskid).subscribe(res => {
      console.log('Claim');
      this.ngOnInit();
    });
  }
  
}