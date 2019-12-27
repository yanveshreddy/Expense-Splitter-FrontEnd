import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseHttpService } from 'src/app/expense-http.service';

@Component({
  selector: 'app-view-expense',
  templateUrl: './view-expense.component.html',
  styleUrls: ['./view-expense.component.css']
})
export class ViewExpenseComponent implements OnInit {

  public expenseId: any;
  public paidByUsers = [];
  public spentByUsers =[];
  public expenseData;
  public expenseName: any;
  public expenseAmount: any;
  

  constructor(private actRoute: ActivatedRoute, 
    private expenseHttpService: ExpenseHttpService,)
     { }


  ngOnInit() {
    this.expenseId=this.actRoute.snapshot.paramMap.get('expenseId');

    this.getSingleExpenseDetails(this.expenseId);
    
  }

  public getSingleExpenseDetails = (expenseId) => {

    this.expenseHttpService.getSingleExpenseDetails(expenseId).subscribe((apiresponse) => {
      //console.log('apiresponseuserofexp: ' + apiresponse.users[0].socketroom);
      //this.users = apiresponse.data.users;
      this.expenseData=apiresponse.data;
      let array1=apiresponse.data.paidBy;

      console.log("anvesh paidBy:"+JSON.stringify(array1))
      array1.forEach(element => {
        this.paidByUsers.push({'userName':element.user.firstName,'amountLent':element.amountLent})
      });

      let array2=apiresponse.data.usersInvolved;
      array2.forEach(element => {
        this.spentByUsers.push({'userName':element.user.firstName,'amountSpent':element.amountSpent})
      });

      


      this.expenseAmount  = apiresponse.data.expenseAmount;
      this.expenseName  = apiresponse.data.expenseTitle;
    //  console.log('users: ' + this.users);
    });
  }

}
