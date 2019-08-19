import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import Applicant from '../model/Applicant';
import Applicanthireinfo from '../model/Applicanthireinfo';
import Job from '../model/Job';
import TaskRef from '../model/TaskRef';
import { map } from 'rxjs/operators';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import Hireprocessinfo from '../model/Hireprocessinfo';
import { BodyOutputType } from 'angular2-toaster';

@Injectable({
  providedIn: 'root'
})
export class ApplicantHireProcessService {

  uri = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }



  //================================================================================
  //Applicant region
  //================================================================================

  addApplicant(applicant_name, applicant_email, applicant_phonenumber, applicant_job) {

    let applicant = new  Applicant(0, applicant_name, applicant_email, applicant_phonenumber, applicant_job);

    const mappedapplicant = this.mapapplicant(applicant);

    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      observe: 'response'
    };
    
    return this.http.post(`${this.uri}/start-applicant-hire-process`, mappedapplicant, httpOptions);      
  }

  getApplicants() {
    return this
           .http
           .get(`${this.uri}/get-applicant-list`).pipe(
            map((data: any[]) => data.map((item: any) => new Applicant(
              item._id=item.id,
              item.applicant_name=item.name,
              item.applicant_email=item.email,
              item.applicant_phonenumber=item.phoneNumber,
              item.applicant_job = new Job(
                item.job.id,
                item.job.code,
                item.job.title
              )
            ))),);
  }

  editApplicant(id) {
    return this
            .http
            .get(`${this.uri}/applicant/edit/${id}`).pipe(
            map((item: any) =>  new Applicant(
              item._id=item.id,
              item.applicant_name=item.name,
              item.applicant_email=item.email,
              item.applicant_phonenumber=item.phoneNumber,
              item.applicant_job = new Job(
                item.job.id,
                item.job.code,
                item.job.title
              )
            )));
  }

  updateApplicant(applicant_name, applicant_email, applicant_phonenumber, applicant_job, id) {

    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      observe: 'response'
    };

    let applicant = new  Applicant(id, applicant_name, applicant_email, applicant_phonenumber, applicant_job);

    const mappedapplicant = this.mapapplicant(applicant);

    return this
      .http
      .put(`${this.uri}/applicant/update/${id}`, mappedapplicant, httpOptions);

  }

  deleteApplicant(id) {
    return this
              .http
              .delete(`${this.uri}/applicant/delete/${id}`);
  }

  //================================================================================
  //Jobs region
  //================================================================================

  getJobs() {
    return this
           .http
           .get(`${this.uri}/get-job-list/0/1000`).pipe(  //temp uri- update it later
            map((data: any[]) => data["content"].map((item: any) => new Job(
              item._id=item.id,
              item.job_code=item.code,
              item.job_title=item.title,
            ))),);
  }

  getJobByID(jobid) {
    return this
           .http
           .get(`${this.uri}/get-job-by-id/${jobid}`).pipe(
            map((item: any) => new Job(
              item._id=item.id,
              item.job_code=item.code,
              item.job_title=item.title,
              item.job_company=item.company,
              item.job_location=item.location,
              item.job_employment=item.employment,
              item.job_jobfunction=item.jobfunction,
              item.job_industry=item.industry,
              item.job_description=item.description,
              item.job_open=item.open,
            )));
  }

  //get list of open jobs by location or title
  //location and title can set to all
  getOpenJobsWithDetailsPaging(location,title,page,itemcount) {
    return this
           .http
           .get(`${this.uri}/get-open-job-list-by-location-title/${location}/${title}/${page}/${itemcount}`);
  }


  //================================================================================
  //Applicant hire info region
  //================================================================================

  getApplicanthireinfoByID(applicantid) {
    return this
           .http
           .get(`${this.uri}/get-apphireinfo-by-id/${applicantid}`).pipe(
            map((item: any) => 
              this.ApplicanthireinfoNullIfUndefined(item)
            ));
  }

  //Return Null if applicant hire info in not exists
  ApplicanthireinfoNullIfUndefined(item)
  {
    if (item){
      return new Applicanthireinfo(
        item._id=item.id,
        new Applicant(
          item.applicant.id,
          item.applicant.name,
          item.applicant.email,
          item.applicant.phoneNumber,
          new Job(
            item.applicant.job.id,
            item.applicant.job.code,
            item.applicant.job.title,
            item.applicant.job.company,
            item.applicant.job.location,
            item.applicant.job.employment,
            item.applicant.job.jobfunction,
            item.applicant.job.industry,
            item.applicant.job.description,
            item.applicant.job.open,
          )
        ),
        item.telintviwres,
        item.telintviwdesc,
        item.techintviwres,
        item.techintviwdesc,
        item.finnegotres,
        item.finnegotdesc
      );
    }
    else{
      let applicanthireinfo = new Applicanthireinfo();
      applicanthireinfo.applicant = new Applicant();
      return applicanthireinfo;
    }
  }


  //================================================================================
  //Process region
  //================================================================================

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //Process region - Phone Interview
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  getPhoneInterviewTasks() {
    return this
           .http
           .get(`${this.uri}/get-active-phoneinterview-tasks`).pipe( 
            map((data: any[]) => data.map((item: any) => new TaskRef(
              item.taskid=item.taskid,
              item.name=item.name,	
              item.assignee=item.assignee,	
              item.category=item.category,
              item.claimtime=item.claimtime,	
              item.createtime=item.createtime,	
              item.description=item.description,	
              item.duedate=item.duedate,	
              item.priority=item.priority,	
              item.processdefinitionid=item.processdefinitionid,
            ))),);
  }

  getPhoneIntviewTaskAssignee() {
    return this
           .http
           .get(`${this.uri}/get-active-phoneinterviewtasks-assignee`).pipe( 
            map((data: any[]) => data.map((item: any) => new TaskRef(
              item.taskid=item.taskid,
              item.name=item.name,	
              item.assignee=item.assignee,	
              item.category=item.category,
              item.claimtime=item.claimtime,	
              item.createtime=item.createtime,	
              item.description=item.description,	
              item.duedate=item.duedate,	
              item.priority=item.priority,	
              item.processdefinitionid=item.processdefinitionid,
            ))),);
  }

  claimPhoneIntviewTask(taskid){

    return this
           .http
           .get(`${this.uri}/claim-phoneinterview-task/${taskid}`);

  }

  completePhoneinterviewTask(taskid, applicanthireinfo)
  {

    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      observe: 'response'
    };

    applicanthireinfo.applicant = this.mapapplicant(applicanthireinfo.applicant);
    
    console.log(applicanthireinfo);

    return this.http.post(`${this.uri}/complete-phoneinterview-task/${taskid}`, applicanthireinfo, httpOptions);
    
  }


  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //Process region - Technical Interview
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  getTechInterviewTasks() {
    return this
           .http
           .get(`${this.uri}/get-active-techinterview-tasks`).pipe( 
            map((data: any[]) => data.map((item: any) => new TaskRef(
              item.taskid=item.taskid,
              item.name=item.name,	
              item.assignee=item.assignee,	
              item.category=item.category,
              item.claimtime=item.claimtime,	
              item.createtime=item.createtime,	
              item.description=item.description,	
              item.duedate=item.duedate,	
              item.priority=item.priority,	
              item.processdefinitionid=item.processdefinitionid,
            ))),);
  }

  getTechIntviewTaskAssignee() {
    return this
           .http
           .get(`${this.uri}/get-active-techinterviewtasks-assignee`).pipe( 
            map((data: any[]) => data.map((item: any) => new TaskRef(
              item.taskid=item.taskid,
              item.name=item.name,	
              item.assignee=item.assignee,	
              item.category=item.category,
              item.claimtime=item.claimtime,	
              item.createtime=item.createtime,	
              item.description=item.description,	
              item.duedate=item.duedate,	
              item.priority=item.priority,	
              item.processdefinitionid=item.processdefinitionid,
            ))),);
  }

  claimTechIntviewTask(taskid){

    return this
           .http
           .get(`${this.uri}/claim-techinterview-task/${taskid}`);

  }

  completeTechinterviewTask(taskid, applicanthireinfo)
  {

    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      observe: 'response'
    };

    applicanthireinfo.applicant = this.mapapplicant(applicanthireinfo.applicant);
    
    return this.http.post(`${this.uri}/complete-techinterview-task/${taskid}`, applicanthireinfo, httpOptions);
    
  }


  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //Process region - Financ Negotiation
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  getFinanceNegotiationTasks() {
    return this
           .http
           .get(`${this.uri}/get-active-financenegotiation-tasks`).pipe( 
            map((data: any[]) => data.map((item: any) => new TaskRef(
              item.taskid=item.taskid,
              item.name=item.name,	
              item.assignee=item.assignee,	
              item.category=item.category,
              item.claimtime=item.claimtime,	
              item.createtime=item.createtime,	
              item.description=item.description,	
              item.duedate=item.duedate,	
              item.priority=item.priority,	
              item.processdefinitionid=item.processdefinitionid,
            ))),);
  }

  getFinanceNegotiationTaskAssignee() {
    return this
           .http
           .get(`${this.uri}/get-active-financenegottasks-assignee`).pipe( 
            map((data: any[]) => data.map((item: any) => new TaskRef(
              item.taskid=item.taskid,
              item.name=item.name,	
              item.assignee=item.assignee,	
              item.category=item.category,
              item.claimtime=item.claimtime,	
              item.createtime=item.createtime,	
              item.description=item.description,	
              item.duedate=item.duedate,	
              item.priority=item.priority,	
              item.processdefinitionid=item.processdefinitionid,
            ))),);
  }

  claimFinanceNegotiationTask(taskid){

    return this
           .http
           .get(`${this.uri}/claim-financenegotiation-task/${taskid}`);

  }

  completeFinanceNegotiationTask(taskid, applicanthireinfo)
  {

    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      observe: 'response'
    };

    applicanthireinfo.applicant = this.mapapplicant(applicanthireinfo.applicant);
    
    return this.http.post(`${this.uri}/complete-financenegotiation-task/${taskid}`, applicanthireinfo, httpOptions);
    
  }


  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //Process region - General
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  getTaskByIDAssignee(taskid) {
    return this
           .http
           .get(`${this.uri}/get-task-by-id-assignee/${taskid}`).pipe( 
            map((item: any) => new TaskRef(
              item.taskid=item.taskid,
              item.name=item.name,	
              item.assignee=item.assignee,	
              item.category=item.category,
              item.claimtime=item.claimtime,	
              item.createtime=item.createtime,	
              item.description=item.description,	
              item.duedate=item.duedate,	
              item.priority=item.priority,	
              item.processdefinitionid=item.processdefinitionid,
            )));
  }

  getProcessVarsByTaskIDAssignee(taskid) {
    return this
           .http
           .get(`${this.uri}/get-hireprocvars-by-taskid-assignee/${taskid}`).pipe(
            map((data: any) => new Applicant(
               data.applicant.id,
               data.applicant.name,
               data.applicant.email,
               data.applicant.phoneNumber,
               new Job(
                  data.applicant.job.id,
                  data.applicant.job.code,
                  data.applicant.job.title,
                  data.applicant.job.company,
                  data.applicant.job.location,
                  data.applicant.job.employment,
                  data.applicant.job.jobfunction,
                  data.applicant.job.industry,
                  data.applicant.job.description,
                  data.applicant.job.open,
               )
            )));
  }

  gethireprocessinfo(fromdate,todate) {
        
    const SrchCondition = {
      "fromdate":fromdate,
      "todate":todate
    };

    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      observe: 'response'
    };

    return this
           .http
           .post(`${this.uri}/getallhireprocesslist`, SrchCondition, httpOptions);

  }

  //================================================================================
  //Map Client Entities to Server Entities
  //================================================================================

  mapapplicant(applicant): object{
    const job = {
      "id":applicant.applicant_job._id,
      "code":applicant.applicant_job.job_code,
      "title":applicant.applicant_job.job_title
    };
    const mappedapplicant = {
      "id": applicant._id,
      "name": applicant.applicant_name,
      "email": applicant.applicant_email,
      "phoneNumber": applicant.applicant_phonenumber,
      "job":job
    };
    return mappedapplicant;  
  }

}  