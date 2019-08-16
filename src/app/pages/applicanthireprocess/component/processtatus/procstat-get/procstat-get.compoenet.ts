import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicantHireProcessService } from '../../../service/applicanthireprocessservice.service';
import Hireprocessinfo from '../../../model/Hireprocessinfo';

@Component({
  selector: 'procstat-get',
  templateUrl: 'procstat-get.component.html',
  styleUrls: ['procstat-get.component.scss'],
})
export class ProcstatComponent implements OnInit {

  hireprocessinfos: Hireprocessinfo[];

  constructor(private fb: FormBuilder,
              private bs: ApplicantHireProcessService) {
  }

  ngOnInit() {

    this.bs
    .gethireprocessinfo()
    .subscribe((data: Hireprocessinfo[]) => {   
      this.hireprocessinfos = data;
      console.log(this.hireprocessinfos);
    });

  }


  setStepper(stepper){
    stepper.next();
  }
}