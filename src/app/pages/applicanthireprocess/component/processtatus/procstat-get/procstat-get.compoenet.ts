import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicantHireProcessService } from '../../../service/applicanthireprocessservice.service';
import Hireprocessinfo from '../../../model/Hireprocessinfo';
import HireprocessTaskinfo from '../../../model/HireprocessTaskinfo';
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
  hireprocessinfo: Hireprocessinfo;
  applicanthireinfo: Applicanthireinfo;
  from_date: Date;
  to_date: Date;

  currentprocessid: Number;

  endstatus: String; 

  constructor(private fb: FormBuilder,
              private bs: ApplicantHireProcessService) {
                this.applicanthireinfo = new Applicanthireinfo();
                this.hireprocessinfo = new Hireprocessinfo();
                this.hireprocessinfo.techinterview = new HireprocessTaskinfo();
                this.hireprocessinfo.telephoneinterview = new HireprocessTaskinfo();
                this.hireprocessinfo.financialnegotiation = new HireprocessTaskinfo();
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

    this.from_date = new Date();
    this.to_date = new Date();

    this.Searchprocess();

  }

  Searchprocess(){

    let from = this.GetFormatedDate(new Date(this.from_date));
    let to = this.GetFormatedDate(new Date(this.to_date));

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
        )
      ),
      this.TelephoneinterviewNullIfUndefined(item),
      this.TechinterviewNullIfUndefined(item),
      this.FinancialnegotiationNullIfUndefined(item),    
      ));
      console.log(this.hireprocessinfos);        
    },);

  }

  setStepper(stepper, applicantid, processid){

    this.currentprocessid = processid;
    this.hireprocessinfo = this.hireprocessinfos.filter(x => x.processid == processid)[0];

    console.log(this.hireprocessinfo);

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

  TelephoneinterviewNullIfUndefined(item)
  {
    if (item.Telephoneinterview){
      return new HireprocessTaskinfo(
        "telephoneinterview", 
        item.data.telephoneInterviewOutcome,
        item.Telephoneinterview.Assignee,
        item.Telephoneinterview.CreateTime,
        item.Telephoneinterview.ClaimTime,
        item.Telephoneinterview.EndTime,
        );
    }
    else{
      return new HireprocessTaskinfo(
        "telephoneinterview", 
        null,
        null,
        null,
        null,
        null,
      );
    }
  }

  TechinterviewNullIfUndefined(item)
  {
    if (item.Techinterview){
      return new HireprocessTaskinfo(
        "techinterview", 
        item.data.techOk,
        item.Techinterview.Assignee,
        item.Techinterview.CreateTime,
        item.Techinterview.ClaimTime,
        item.Techinterview.EndTime,
      );
    }
    else{
      return new HireprocessTaskinfo(
        "techinterview", 
        null,
        null,
        null,
        null,
        null,
      );
    }
  }

  FinancialnegotiationNullIfUndefined(item)
  {
    if (item.Financialnegotiation){
      return new HireprocessTaskinfo(
        "financialnegotiation", 
        item.data.financialOk,
        item.Financialnegotiation.Assignee,
        item.Financialnegotiation.CreateTime,
        item.Financialnegotiation.ClaimTime,
        item.Financialnegotiation.EndTime,
      );
    }
    else{
      return new HireprocessTaskinfo(
        "financialnegotiation", 
        null,
        null,
        null,
        null,
        null,
      );
    }
  }


  GetFormatedDate(date)
  {
    let year: String = date.getFullYear().toString();
    let month: String = (date.getMonth() + 1).toString();
    let day: String = date.getDate().toString();
    if (day.length<2) day = '0' + day;
    if (month.length<2) month = '0' + month;
    
    return [ day, month, year].join('-');
  }

}