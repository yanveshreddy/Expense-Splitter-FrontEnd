import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './user/signin/signin.component';
import { CreateGroupComponent } from './group/create-group/create-group.component';
import { UserdashboardComponent } from './dashboard/userdashboard/userdashboard.component';
import { GroupViewComponent } from './group/group-view/group-view.component';
import { SignupComponent } from './user/signup/signup.component';
import { ForgotpasswordComponent } from './user/forgotpassword/forgotpassword.component';
import { AddexpenseComponent } from './expense/addexpense/addexpense.component';
import { ViewExpenseComponent } from './expense/view-expense/view-expense.component';
import { UserRouteguardService } from './shared/user-routeguard.service';


@NgModule({
  imports: [],
  exports: []
})

export class AppRoutingModule { }
