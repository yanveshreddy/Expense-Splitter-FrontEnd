import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { RouterModule } from '@angular/router';
import { UserRouteguardService } from '../shared/user-routeguard.service';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [UserdashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path:'userdashboard',component:UserdashboardComponent,canActivate:[UserRouteguardService]},
     ])
  ],
  providers:[UserRouteguardService]
})
export class DashboardModule { }
