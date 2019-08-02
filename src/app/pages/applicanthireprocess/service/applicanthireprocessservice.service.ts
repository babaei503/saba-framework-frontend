import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import Applicant from '../model/Applicant';
import Job from '../model/Job';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicantHireProcessService {

  uri = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

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

  getJobs() {
    return this
           .http
           .get(`${this.uri}/get-job-list`).pipe(
            map((data: any[]) => data.map((item: any) => new Job(
              item._id=item.id,
              item.job_code=item.code,
              item.job_title=item.title,
            ))),);
  }

  getOpenJobsWithDetailsPaging(page,itemcount) {
    return this
           .http
           .get(`${this.uri}/get-open-job-list-with-paging/${page}/${itemcount}`).pipe(
            map((data: any[]) => data.map((item: any) => new Job(
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
            ))),);
  }

  getOpenJobsWithDetailsByLocation(location) {
    return this
           .http
           .get(`${this.uri}/get-open-job-list-by-location/${location}`).pipe(
            map((data: any[]) => data.map((item: any) => new Job(
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

}  