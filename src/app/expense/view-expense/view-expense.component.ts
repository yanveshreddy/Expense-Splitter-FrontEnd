import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseHttpService } from 'src/app/expense-http.service';

@Component({
  selector: 'app-view-expense',
  templateUrl: './view-expense.component.html',
  styleUrls: ['./view-expense.component.css']
})
export class ViewExpenseComponent implements OnInit {

  public id: any;
  public users = [];
  public expenseName: any;
  public expenseAmount: any;
  

  constructor(private route: ActivatedRoute, 
    private expenseHttpService: ExpenseHttpService,)
     { }


  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.id = params['id'];
      //this.room = params['r'];
  });

    this.getAllUsersForExpense(this.id);
    // this.socketService.init(this.room);
    // this.socketService.recvBroadcast().subscribe((apiresponse) => {
    //   console.log('apiresponmse: ' + apiresponse);
    // });
  }

  public getAllUsersForExpense = (id) => {

    this.expenseHttpService.getAllUsersForExpense(id).subscribe((apiresponse) => {
      console.log('apiresponseuserofexp: ' + apiresponse.users[0].socketroom);
      this.users = apiresponse.users;
      this.expenseAmount  = apiresponse.amount;
      this.expenseName  = apiresponse.expensename;
    //  console.log('users: ' + this.users);
    });
  }

}
