import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicantHireProcessService } from '../../../service/applicanthireprocessservice.service';
import Hireprocessinfo from '../../../model/Hireprocessinfo';

import Applicant from '../../../model/Applicant';
import Applicanthireinfo from '../../../model/Applicanthireinfo';
import Job from '../../../model/Job';

@Component({
  selector: 'procstat-get',
  templateUrl: 'procstat-get.component.html',
  styleUrls: ['procstat-get.component.scss'],
})
export class ProcstatComponent implements OnInit {

  angForm: FormGroup;

  hireprocessinfos: Hireprocessinfo[];
  applicanthireinfo: Applicanthireinfo;
  from_date: String;
  to_date: String;

  currentprocessid: Number;

  endstatus: String; 

  constructor(private fb: FormBuilder,
              private bs: ApplicantHireProcessService) {
                this.applicanthireinfo = new Applicanthireinfo();
                this.endstatus = "End";
                this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      fromdate: [''],
      todate: [''],
      });
  }

  ngOnInit() {

    let date: Date = new Date();
    let year: String = date.getFullYear().toString();
    let month: String = date.getMonth().toString();
    let day: String = date.getDate().toString();
    if (day.length<2) day = '0' + day;
    if (month.length<2) month = '0' + month;
    
    this.from_date = [ day, month, year].join('-');
    //this.to_date = [ day, month, year].join('-');
    this.to_date = '12-10-2019';

    this.Searchprocess(this.from_date, this.to_date);

  }

  Searchprocess(from,to){

    this.currentprocessid = null;

    this.bs
    .gethireprocessinfo(from, to).subscribe(data => {
      this.hireprocessinfos = data['body'].map((item: any) => new Hireprocessinfo(
      item.processid,
      new Applicant(
      item.data.applicant.id,
      item.data.applicant.name,
      item.data.applicant.email,
      item.data.applicant.phoneNumber,
      new Job(
        item.data.applicant.job.id,
        item.data.applicant.job.code,
        item.data.applicant.job.title,
        item.data.applicant.job.company,
        item.data.applicant.job.location,
        item.data.applicant.job.employment,
        item.data.applicant.job.jobfunction,
        item.data.applicant.job.industry,
        item.data.applicant.job.description,
        item.data.applicant.job.open,
      )),
      item.data.telephoneInterviewOutcome,
      item.data.techOk,
      item.data.financialOk
      ));
      console.log(this.hireprocessinfos);         
    },);

  }

  setStepper(stepper, applicantid, processid){
    this.currentprocessid = processid;
    this.bs
    .getApplicanthireinfoByID(applicantid).subscribe(data => {
        this.applicanthireinfo =data;
        console.log(data);

        stepper.reset();

        if (this.applicanthireinfo.telintviwres && this.applicanthireinfo.techintviwres && this.applicanthireinfo.finnegotres)
          this.endstatus = "Accepted";
        else if (this.applicanthireinfo.telintviwres==false || this.applicanthireinfo.techintviwres==false || this.applicanthireinfo.finnegotres==false) 
          this.endstatus = "Rejected"; 
        else
          this.endstatus = "End";
    });
  
  }
}