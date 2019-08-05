import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ApplicantHireProcessService } from '../../../service/applicanthireprocessservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import Applicant from '../../../model/Applicant';
import Job from '../../../model/Job';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-gst-add',
  templateUrl: './gst-add.component.html',
  styleUrls: ['./gst-add.component.css']
})
export class GstAddComponent implements OnInit {

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

  applicant: Applicant;

  angForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder, 
    private bs: ApplicantHireProcessService, 
    private router: Router, 
    private toastrService: NbToastrService) {
    this.applicant = new Applicant();
    this.applicant.applicant_job = new Job();
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      applicant_name: ['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
      applicant_email: ['', Validators.compose([Validators.required, Validators.email])],
      applicant_phonenumber:['',Validators.pattern('(^$|[0-9]{11})')],
    });
  }

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.bs
      .getJobByID(params['jobid'])
      .subscribe((data: Job) => {
        this.applicant.applicant_job = data;
        console.log(data);
      });
 
    });  

  }

  addApplicant(applicant_name, applicant_email, applicant_phonenumber) {

    this.bs.addApplicant(applicant_name, applicant_email, applicant_phonenumber, this.applicant.applicant_job).subscribe(res => 
      { 
        //make toast message
        this.title = `You applied for`;
        this.content = `Job Title: ${this.applicant.applicant_job.job_title}`;
        this.status = NbToastStatus.SUCCESS;
        this.showToast(this.status,this.title,this.content);
        this.router.navigate(['/pages/home']);
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