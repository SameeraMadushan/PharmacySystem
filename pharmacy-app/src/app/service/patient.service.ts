/**
 * Created by Umani Welisara on 6/24/2017.
 */

import { Injectable }              from '@angular/core';
import {Http, Response, Headers, RequestOptions}          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';



@Injectable()
export class PatientService {


  constructor (private http: Http) {}

  getPatient(): Observable<any[]> {
    return this.http.get("http://localhost:3000/get-patient")
      .map(this.extractData)
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  postPatient(patient: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:3000/post-patient",patient, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  // deletePatient(patientID:any):Observable<any>{
  //   return this.http.delete('http://localhost:3000/delete-patient/' + patientID)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

}

