import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ApplicantHireProcessService } from '../../../service/applicanthireprocessservice.service';
import Applicant from '../../../model/Applicant';
import Job from '../../../model/Job';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-gst-edit',
  templateUrl: './gst-edit.component.html',
  styleUrls: ['./gst-edit.component.css']
})
export class GstEditComponent implements OnInit {

  config: ToasterConfig;

  index = 1;
  destroyByClick = true;
  duration = 0;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_RIGHT;
  preventDuplicates = false;
  status: NbToastStatus = NbToastStatus.WARNING;

  title = 'Error';
  content = `Error`;

  applicant: Applicant;//You can define models as any(with no problem)
  selectedjobid: BigInteger;
  selectedjob: Job;
  jobs: Job[];
  angForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bs: ApplicantHireProcessService,
    private fb: FormBuilder,
    private toastrService: NbToastrService){
      this.createForm();
    }

  createForm() {
    this.angForm = this.fb.group({
      applicant_name: ['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(50)])],
      applicant_email: ['', Validators.compose([Validators.required, Validators.email])],
      applicant_phonenumber:['',Validators.pattern('(^$|[0-9]{11})')],
      applicant_job:[Job, Validators.required]
      });
    }


  ngOnInit() {

    this.applicant = new Applicant();

    this.bs
    .getJobs()
    .subscribe((data: Job[]) => {
      this.jobs = data;
      console.log(this.jobs);
    });

    this.route.params.subscribe(params => {
        this.bs.editApplicant(params['id']).subscribe(res => {
          this.applicant = res;
          this.selectedjobid = this.applicant.applicant_job._id;
          console.log(this.applicant);
      });
    });
    
  }

  updateApplicant(applicant_name, applicant_email, applicant_phonenumber, selectedjobid) {

    this.selectedjob = this.jobs.find(x => x._id==selectedjobid);
    console.log(this.jobs);
    console.log(this.selectedjob);
    this.route.params.subscribe(params => {

        this.bs.updateApplicant(applicant_name, applicant_email, applicant_phonenumber, this.selectedjob , params['id']).subscribe(res => 
        { 
          //make toast message
          this.title = `Applicant`;
          this.content = `Applicant info updated`;
          this.status = NbToastStatus.SUCCESS;
          this.showToast(this.status,this.title,this.content);
          this.router.navigate(["/pages/hireprocess/applicant"]);
        },
        error => 
        {
          //error catch in exceptionhandling
          console.log(error,"error");
        });

        //this.bs.getApplicants();

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