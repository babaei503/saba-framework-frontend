import { Component , OnInit } from '@angular/core';
import Job from '../../../model/Job';
import { ApplicantHireProcessService } from '../../../service/applicanthireprocessservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'job-get',
  styleUrls: ['./job-get.component.scss'],
  templateUrl: './job-get.component.html',
})
export class JobgetComponent implements OnInit {

    jobs: Job[];

    constructor(
        private route: ActivatedRoute,
        private bs: ApplicantHireProcessService) { }
    
      ngOnInit() { 
        this.route.params.subscribe(params => {
            if (params['location']=='all')
            {
                this.bs
                .getOpenJobsWithDetailsPaging(0,10)
                .subscribe((data: Job[]) => {
                  this.jobs = data;
                  console.log(this.jobs);  
                }); 
            }
            else{
            this.bs
            .getOpenJobsWithDetailsByLocation(params['location'])
            .subscribe((data: Job[]) => {
              this.jobs = data;
              console.log(this.jobs);          
          }); 
        } 
        });   
      
      }
}
