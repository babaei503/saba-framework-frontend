import { Component, OnInit } from '@angular/core';
import Applicant from '../../../model/Applicant';
import { ApplicantHireProcessService } from '../../../service/applicanthireprocessservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { DialogDeletePromptComponent } from '../../../../../commoncomponent/dialog-delete-prompt/dialog-delete-prompt.component';

@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.css']
})
export class GstGetComponent implements OnInit {

  applicants: Applicant[];

  constructor(
    private bs: ApplicantHireProcessService,
    private dialogService: NbDialogService) { }

  ngOnInit() {

    this.bs
      .getApplicants()
      .subscribe((data: Applicant[]) => {
        this.applicants = data;
        console.log(this.applicants);
    });
     
  }

  opendeletedialog(id) {
    this.dialogService.open(DialogDeletePromptComponent)
      .onClose.subscribe(confirm => {
        if (confirm=="Yes") this.deleteApplicant(id); 
      } );
  }

  deleteApplicant(id) {
    this.bs.deleteApplicant(id).subscribe(res => {
      console.log('Deleted');
      this.ngOnInit();
    });
  }
  
}