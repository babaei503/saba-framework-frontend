import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import Applicant from '../model/Applicant';
import Job from '../model/Job';
import TaskRef from '../model/TaskRef';
import { map } from 'rxjs/operators';

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

    const applicant = this.mapapplicant(applicant_name, applicant_email, applicant_phonenumber, applicant_job);

    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      observe: 'response'
    };
    
    return this.http.post(`${this.uri}/start-applicant-hire-process`, applicant, httpOptions);      
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

    const applicant = this.mapapplicant(applicant_name, applicant_email, applicant_phonenumber, applicant_job);

    return this
      .http
      .put(`${this.uri}/applicant/update/${id}`, applicant, httpOptions);

  }

  deleteApplicant(id) {
    return this
              .http
              .delete(`${this.uri}/applicant/delete/${id}`);
  }

  mapapplicant(applicant_name, applicant_email, applicant_phonenumber, applicant_job): object{
    const job = {
      "id":applicant_job._id,
      "code":applicant_job.job_code,
      "title":applicant_job.job_title
    };
    const applicant = {
      "name": applicant_name,
      "email": applicant_email,
      "phoneNumber": applicant_phonenumber,
      "job":job
    };
    return applicant;  
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
  //Process region
  //================================================================================

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

  claim(taskid){

    return this
           .http
           .get(`${this.uri}/claim-phoneinterview-task/${taskid}`);

  }

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

}  