import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import TaskRef from '../../../model/TaskRef';
import Applicant from '../../../model/Applicant';
import Job from '../../../model/Job';
import { ApplicantHireProcessService } from '../../../service/applicanthireprocessservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToasterConfig } from 'angular2-toaster';
import Applicanthireinfo from '../../../model/Applicanthireinfo';

@Component({
  selector: 'techi-do',
  templateUrl: './techi-do.component.html',
  styleUrls: ['./techi-do.component.scss']
})
export class TechiDoComponent implements OnInit {


  config: ToasterConfig;

  index = 1;
  destroyByClick = true;
  duration = 0;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_RIGHT;
  preventDuplicates = false;
  status: NbToastStatus = NbToastStatus.WARNING;

  title = 'Error';
  content = 'Error';

  angForm: FormGroup;

  assigneetaskref: TaskRef;
  applicant: Applicant;
  applicanthireinfo: Applicanthireinfo;

  constructor(
    private fb: FormBuilder, 
    private bs: ApplicantHireProcessService,
    private dialogService: NbDialogService,
    private route: ActivatedRoute,
    private router: Router, 
    private toastrService: NbToastrService) { 
      this.assigneetaskref = new TaskRef();
      this.applicant = new Applicant();
      this.applicant.applicant_job = new Job();
      this.applicanthireinfo=new Applicanthireinfo();
      this.applicanthireinfo.applicant = this.applicant;
      this.createForm();
    }

  createForm() {
    this.angForm = this.fb.group({
      techintviwdesc: ['', Validators.compose([Validators.required])],
      techintviwres: [Boolean],
    });
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

  completetask(){

    this.applicanthireinfo.applicant = this.applicant;

    this.bs.completeTechinterviewTask(this.assigneetaskref.taskid, this.applicanthireinfo).subscribe(res => 
      { 
        //make toast message
        this.title = `The task complete`;
        this.content = `Successfull`;
        this.status = NbToastStatus.SUCCESS;
        this.showToast(this.status,this.title,this.content);
        this.router.navigate(['/pages/hireprocess/techinterview']);

        console.log(res);
      },
      error => 
      {
        //error catch in exceptionhandling
        console.log(error,"error");
      });

  }

  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };

    this.index += 1;
    this.toastrService.show(
      body,
      `${title}`,
      config);
  }
  
}