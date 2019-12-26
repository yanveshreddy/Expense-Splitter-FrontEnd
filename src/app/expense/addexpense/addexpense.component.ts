import { Component,OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupHttpService } from 'src/app/group-http.service';
import { ExpenseHttpService } from 'src/app/expense-http.service';
import { CookieService } from 'ng2-cookies';
import { expenseData } from 'src/app/shared/expenseData';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-addexpense',
  templateUrl: './addexpense.component.html',
  styleUrls: ['./addexpense.component.css'],
  providers:[CookieService]
})
export class AddexpenseComponent implements OnInit {

  
  public expenseTitle: any;
  public expenseDescription: any;
  public expenseAmount: number;
  public PaidBy: Array<object>=[];
  public usersInvolved: Array<object>=[];
  public createdBy: any;
  public groupId: any;
  public groupName:string;
 
  public user_Id: any;
  public allGroupUsers: any;
  public amountSpent:number;
  public amountLent:number;
  public paidBySelectedUsers: Array<object>;
  public usersInvolvedSelected:Array<object>;

  constructor(public groupHttpService: GroupHttpService, public route: Router, 
              public actRoute: ActivatedRoute, public cookieService: CookieService,
              public expenseHttpService: ExpenseHttpService,
             ) { }

              
  ngOnInit() {

    this.groupId=this.actRoute.snapshot.paramMap.get('groupId');
    console.log(this.groupId);
  //   this.actRoute.queryParams.subscribe(params => {
  //     console.log(params);
  //     this.groupId = params['groupId'];
  // });
    this.user_Id = this.cookieService.get('_id');
    this.createdBy = this.user_Id;
    this.getSingleGroupDetails(this.groupId);
    this.getAllUsersForGroup(this.groupId);
  }

  public getSingleGroupDetails=(groupId)=>{
    this.groupHttpService.getSingleGroupDetails(groupId).subscribe((apiresponse)=>{
          this.groupName=apiresponse.data.groupName;
          console.log(this.groupName);
    })
}
  public getAllUsersForGroup = (groupId) => {
    this.groupHttpService.getAllUsersForAGroup(groupId).subscribe((apiresponse) => {
    console.log('group' + apiresponse);
    this.allGroupUsers = apiresponse.data.users;
    });
  }

  public createExpense = () => {
   //// console.log('selectedUsers' + this.selectedUsers);
  //  console.log('allGroupUsers' + this.allGroupUsers);
    console.log(this.paidBySelectedUsers,this.usersInvolvedSelected)
    let noOfPaidUsers = this.paidBySelectedUsers.length;

    this.amountLent=this.expenseAmount/noOfPaidUsers;

    this.paidBySelectedUsers.forEach(element => {
      this.PaidBy.push({user:element,amountLent:this.amountLent})
    });
    

    let noOfUsersInvolved = this.usersInvolvedSelected.length;

    this.amountSpent=this.expenseAmount/noOfUsersInvolved;

    this.usersInvolvedSelected.forEach(element => {
      this.usersInvolved.push({user:element,amountSpent:this.amountSpent})
    });
    

   const expenseData:expenseData = {
     groupId: this.groupId,
     expenseTitle:this.expenseTitle,
     expenseDescription:this.expenseDescription,
     expenseAmount: this.expenseAmount,
     createdBy: this.createdBy,
     paidBy: this.PaidBy,
     usersInvolved: this.usersInvolved
   };
   console.log(expenseData);
   this.expenseHttpService.createExpense(expenseData).subscribe((apiresponse) => {
    if (apiresponse) {
      console.log('createexp api response: ' + apiresponse);
      // this.socket.init(apiresponse.users[0].socketroom);
      // this.socket.recvBroadcast();
      //this.route.navigate(['/group/expense'], { queryParams: { id: this.id, r: apiresponse.users[0].socketroom } });
    }

    });
  }

}
