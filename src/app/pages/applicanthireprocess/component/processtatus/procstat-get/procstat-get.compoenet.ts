import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'procstat-get',
  templateUrl: 'procstat-get.component.html',
  styleUrls: ['procstat-get.component.scss'],
})
export class ProcstatComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

  }


  setStepper(stepper){
    stepper.next();
  }
}