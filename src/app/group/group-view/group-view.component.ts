import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseHttpService } from 'src/app/expense-http.service';
import { GroupHttpService } from 'src/app/group-http.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit {

  public groupId: any;
  public expenseList=[];
  constructor(private actRoute: ActivatedRoute, private expenseHttpService: ExpenseHttpService,private groupHttpService:GroupHttpService) { }

  ngOnInit() {
    this.groupId=this.actRoute.snapshot.paramMap.get('groupId');

  //   this.route.queryParams.subscribe(params => {
  //     console.log(params);
  //     this.groupId = params['groupId'];
  // });
   
    this.getAllExpenseInThisGroup(this.groupId);
  }

  

public getAllExpenseInThisGroup = (groupId) => {
 this.expenseHttpService.getAllExpensesInGroup(groupId).subscribe((apiresponse) => {
  console.log('expenses' + apiresponse.data);
  this.expenseList = apiresponse.data;

});
}

}
