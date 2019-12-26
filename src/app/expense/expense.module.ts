import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddexpenseComponent } from './addexpense/addexpense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { RouterModule } from '@angular/router';

import { ViewExpenseComponent } from './view-expense/view-expense.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { UserRouteguardService } from '../shared/user-routeguard.service';
import {MatSelectModule} from '@angular/material';


@NgModule({
  declarations: [AddexpenseComponent, EditExpenseComponent, ViewExpenseComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatSelectModule,
    RouterModule.forChild([
      {
      path: 'viewgroup/:groupId/addexpense',
      component: AddexpenseComponent,
      canActivate:[UserRouteguardService]
    },
    {
      path: 'viewgroup/:groupId/expense/:expenseId',
      component: ViewExpenseComponent,
      canActivate:[UserRouteguardService]
    }
  ])
    
  ]
})
export class ExpenseModule { }
