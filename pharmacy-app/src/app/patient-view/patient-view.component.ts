/**
 * Created by Umani Welisara on 6/24/2017.
 */

import { Component } from '@angular/core';
import {CourseService} from "../service/patient.service";

@Component({
  selector: 'patient-view',
  templateUrl: './patient-view.component.html',
  //styleUrls: ['./app.component.css']
})
export class PatientViewComponent {
  title = 'patient ';
  patient:any;
  errorMessage:string;
  submitData={name:"",age:"",dateOfBirth:"",address:"",contactNumber:"",
    prescriptionNo:"",prescriptionDetails:"",checkedBy:"",date:""};
  msg:string;

  constructor(private patientService : PatientService){
    this.patient=[];
    this.getPatient();
  }
  getPatient(){

    this.patientService.getPatient()
      .subscribe(
        patient => this.patient = patient,
        error =>  this.errorMessage = <any>error);
  }
  submitPatient(){
    console.log(this.submitData);
    this.patientService.postPatient(this.submitData)
      .subscribe(
        patient  => this.patient.push(patient),
        error =>  this.errorMessage = <any>error);
  }
  deletePatient(id){
    this.patientService.deletePatient(id)
      .subscribe(

        error =>  this.errorMessage = <any>error

      );

  }

}



