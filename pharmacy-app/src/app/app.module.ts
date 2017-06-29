import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {JsonpModule, HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {PatientViewComponent} from "./patient-view/patient-view.component";
import {PatientService} from "./service/patient.service";
import {SignUpComponent} from "./signup/signup.component";
import {UserService} from "./service/user.service";
import {LoginComponent} from "./login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    PatientViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [PatientService,UserService],
  bootstrap: [AppComponent,PatientViewComponent,SignUpComponent,LoginComponent]
})
export class AppModule { }
