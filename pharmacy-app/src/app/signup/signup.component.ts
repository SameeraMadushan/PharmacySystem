/**
 * Created by Lenovo-Y50 on 6/29/2017.
 */
import { Component } from '@angular/core';

import {UserService} from "../../services/user.service";

@Component({
  moduleId:module.id,
  selector: 'sign-up',
  templateUrl: `signup.component.html`,
  providers:[UserService]
})

export class SignUpComponent{

  data={firstName:"",password:"",lastName:"",userName:"",possition:"",email:"",contactno:"",password:""};
  constructor(private userService:UserService){

  }
  formSubmit(){
    console.log(this.data);
    var user={
      firstName:this.data.firstName,
      lastName:this.data.lastName,
      userName:this.data.userName,
      possition:this.data.possition,
      email:this.data.email,
      contactno:this.data.contactno,
      password:this.data.password
    };

    if(this.userService.signUp(user).subscribe()){
      console.log("Successfully Signed up");
    }

  }

}
