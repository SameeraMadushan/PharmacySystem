/**
 * Created by Lenovo-Y50 on 6/28/2017.
 */
import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService{

  constructor(private http:Http){
    console.log('Task service initialized...');
  }

  login(user){
    var headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/login',JSON.stringify(user),{headers:headers})
      .map(res=>res.json());
  }

  signUp(user){
    var headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/sign-up',JSON.stringify(user),{headers:headers}).map(res=>res.json());

  }
}
