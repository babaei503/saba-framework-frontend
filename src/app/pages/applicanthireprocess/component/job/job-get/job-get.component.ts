import { Component , OnInit } from '@angular/core';
import Job from '../../../model/Job';
import { ApplicantHireProcessService } from '../../../service/applicanthireprocessservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'job-get',
  styleUrls: ['./job-get.component.scss'],
  templateUrl: './job-get.component.html',
})
export class JobgetComponent implements OnInit {

    page: any;
    pagesize: any;
    itemcount: any;
    previousPage: any;

    Job_title: "all";
    Job_location: "all";
    jobs: Job[];
    angForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private bs: ApplicantHireProcessService) { 
          this.page = 1;        //Current page number- Requested page
          this.pagesize = 2;   //Number of items in each page
          this.itemcount = 0;  //Total items that include in search
          this.previousPage = 0;
          this.createForm();
        }
    
      createForm() {
        this.angForm = this.fb.group({
          location: [''],
          title: [''],
          });
        }

      ngOnInit() { 
          this.route.params.subscribe(params => {
                  this.Job_location = params['location'];
                  this.Job_title = params['title'];
  
                  this.Searchjob(this.Job_location,this.Job_title, this.page, this.pagesize);
          });      
      }        

      //event that fire by page change
      loadPage(page: number) {
        if (page !== this.previousPage) {
          this.previousPage = page;
          this.Searchjob(this.Job_location,this.Job_title, this.page, this.pagesize);
        }
      }

      //get jobs by pagination.
      Searchjob(location, title, page, pagesize) {
        if (location=="") location="all";
        if (title=="") title="all";
        this.bs
        .getOpenJobsWithDetailsPaging(location, title, page - 1, pagesize)
        .subscribe((data: any[]) => {
          this.jobs = data["content"].map((item: any) => new Job(
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
                      ))  ;  
          this.itemcount = data["totalElements"]; //Set total number of elements. Total number is used for pagination.
        });
      }
}
