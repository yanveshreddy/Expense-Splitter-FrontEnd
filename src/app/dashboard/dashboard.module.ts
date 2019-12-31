import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { RouterModule } from '@angular/router';
import { UserRouteguardService } from '../shared/user-routeguard.service';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [UserdashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxPaginationModule,
    ToastrModule,
    NgbModalModule,
    NgbModule,
    RouterModule.forChild([
      { path:'userdashboard',component:UserdashboardComponent,canActivate:[UserRouteguardService]},
     ])
  ],
  providers:[UserRouteguardService]
})
export class DashboardModule { }
