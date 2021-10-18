import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminFormRegComponent} from "./Users/admin/adminFormReg/admin-form-reg/admin-form-reg.component";
import { AdminComponent} from "./Users/admin/admin.component";
import {HttpClientModule} from "@angular/common/http";
import {UserComponent} from "./Users/user/user.component";


const appRoutes : Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'login',component: LoginComponent},
  {path: 'regist',component: RegisterComponent},
  { path: 'adminPage', component: AdminComponent },
  { path: 'userPage', component: UserComponent },
  { path: 'adminFormReg', component: AdminFormRegComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ContactsComponent,
    AdminFormRegComponent,
    AdminComponent,
    UserComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
