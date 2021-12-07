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
import { AdminFormRegComponent } from "./Users/admin/adminFormReg/admin-form-reg/admin-form-reg.component";
import { AdminComponent } from "./Users/admin/admin.component";
import { HttpClientModule } from "@angular/common/http";
import { UserComponent } from "./Users/user/user.component";
import { HeaderAdminComponent } from './headers/headers-admin/header-admin/header-admin.component';
import { HeaderUnregComponent } from './headers/headerUnreg/header-unreg/header-unreg.component';
import { ShelterComponent } from './Users/admin/shelter/shelter/shelter.component';
import { AccountAdminComponent } from './Users/admin/accountAdmin/account-admin/account-admin.component';
import { ChangeAccountDataComponent } from './Users/admin/changesData/changeAccount/change-account-data/change-account-data.component';
import { ChangeShelterDataComponent } from './Users/admin/changesData/changeShelter/change-shelter-data/change-shelter-data.component';
import { CommonModule } from '@angular/common';
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import { AddAnimalComponent } from './Users/admin/shelter/addAnimal/add-animal/add-animal.component';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditAnimalComponent } from './Users/admin/shelter/editAnimal/edit-animal/edit-animal.component';
import { FullInfoAnimalComponent } from './Users/admin/shelter/watchInfoAnimal/full-info-animal/full-info-animal.component';



const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'regist', component: RegisterComponent },
  { path: 'adminPage/:userId', component: AdminComponent },
  { path: 'userPage', component: UserComponent },
  { path: 'adminFormReg/:userId', component: AdminFormRegComponent },
  { path: 'shelter/:shelterId', component: ShelterComponent },
  { path: 'account/:userId, shelterId', component: AccountAdminComponent },
  { path: 'changeAccount/:shelterId, userId', component: ChangeAccountDataComponent},
  { path: 'changeShelter/:shelterId, userId', component: ChangeShelterDataComponent },
  { path: 'addAnimals/:shelterId' , component: AddAnimalComponent},
  { path: 'editAnimal' , component: EditAnimalComponent},
  { path: 'fullInfoAnimal' , component: FullInfoAnimalComponent},
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
    UserComponent,
    HeaderAdminComponent,
    HeaderUnregComponent,
    ShelterComponent,
    AccountAdminComponent,
    ChangeAccountDataComponent,
    ChangeShelterDataComponent,
    AddAnimalComponent,
    EditAnimalComponent,
    FullInfoAnimalComponent,



  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    CommonModule,
    NgbDropdownModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
