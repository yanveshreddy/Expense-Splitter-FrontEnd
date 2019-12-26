import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './user/signin/signin.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from './dashboard/dashboard.module';
import { GroupModule } from './group/group.module';
import { ExpenseModule } from './expense/expense.module';
import { SharedModule } from './shared/shared.module';
import { UserHttpService } from './user-http.service';
import { GroupHttpService } from './group-http.service';
import { ExpenseHttpService } from './expense-http.service';
import { UserdashboardComponent } from './dashboard/userdashboard/userdashboard.component';
import { LayoutComponent } from './shared/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000
    }),
    UserModule,
    SharedModule,
    DashboardModule,
    GroupModule,
    ExpenseModule,
    RouterModule.forRoot([
      {path:'signin',component:SigninComponent,pathMatch:'full'},
     {path:'',redirectTo:'signin',pathMatch:'full'},
    {path:"*",component:SigninComponent},
      // {path:"**",component:SigninComponent},
    ]),
  ],
  providers: [UserHttpService,GroupHttpService,ExpenseHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
