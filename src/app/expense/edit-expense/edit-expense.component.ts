import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpenseHttpService } from 'src/app/expense-http.service';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Location } from '@angular/common';
import { expenseData } from 'src/app/shared/expenseData';
import { GroupHttpService } from 'src/app/group-http.service';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css'],
  providers:[SocketService]
})
export class EditExpenseComponent implements OnInit {

  public expenseData;
  public expenseId;

  public expenseTitle: any;
  public expenseDescription: any;
  public expenseAmount: number;
  public paidBy = [];
  public usersInvolved = [];
  public createdBy: any;
  public groupId: any;
  public groupName: string;

  public userId;
  public amountSpent: number;
  public amountLent: number;
  public allGroupUsers: any;
  public paidBySelectedUsers = [];
  public usersInvolvedSelected = [];

  constructor(public _route: ActivatedRoute, public router: Router, public expenseHttpService: ExpenseHttpService,
    public groupHttpService: GroupHttpService,  public socketService:SocketService,public toastr: ToastrService, public location: Location) { }

  ngOnInit() {
    this.userId=Cookie.get('userId');
    this.expenseId = this._route.snapshot.paramMap.get('expenseId');
    this.getSingleExpenseDetails(this.expenseId);
  }


  public getSingleExpenseDetails = (expenseId) => {

    this.expenseHttpService.getSingleExpenseDetails(expenseId).subscribe((apiresponse) => {

      this.expenseData = apiresponse.data;
      this.groupId = apiresponse.data.groupId;
      this.expenseTitle = apiresponse.data.expenseTitle;
      this.expenseDescription = apiresponse.data.expenseDescription;
      this.expenseAmount = apiresponse.data.expenseAmount;
      this.paidBy = apiresponse.data.paidBy;
      this.usersInvolved = apiresponse.data.usersInvolved;
      // let paidBySelectedUsers
      console.log("ExpenseData"+JSON.stringify(this.expenseData))
      this.paidBy.forEach(ele => {
        console.log("Ele"+ele)
        this.paidBySelectedUsers.push(ele.user._id)
      })
      this.usersInvolved.forEach(ele => {
        this.usersInvolvedSelected.push(ele.user._id)
      })
      
    this.getSingleGroupDetails(this.groupId);
    this.getAllUsersForGroup(this.groupId);

    })
    
  }


  public getSingleGroupDetails = (groupId) => {
    this.groupHttpService.getSingleGroupDetails(groupId).subscribe((apiresponse) => {
      this.groupName = apiresponse.data.groupName;
      console.log(this.groupName);
    })
  }
  public getAllUsersForGroup = (groupId) => {
    this.groupHttpService.getAllUsersForAGroup(groupId).subscribe((apiresponse) => {
      console.log('group' + apiresponse);
      this.allGroupUsers = apiresponse.data.users;
    });
  }



  public editExpense = () => {

    let noOfPaidUsers = this.paidBySelectedUsers.length;

    this.amountLent = this.expenseAmount / noOfPaidUsers;

    this.paidBySelectedUsers.forEach(element => {
      this.paidBy.push({ user: element, amountLent: this.amountLent })
    });


    let noOfUsersInvolved = this.usersInvolvedSelected.length;

    this.amountSpent = this.expenseAmount / noOfUsersInvolved;

    this.usersInvolvedSelected.forEach(element => {
      this.usersInvolved.push({ user: element, amountSpent: this.amountSpent })
    });



     
      this.expenseData.expenseTitle= this.expenseTitle,
      this.expenseData.expenseDescription= this.expenseDescription,
      this.expenseData.expenseAmount= this.expenseAmount,
      this.expenseData.paidBy= this.paidBy,
      this.expenseData.usersInvolved= this.usersInvolved
    

    this.expenseHttpService.updateExpense(this.expenseData).subscribe(
      data => {

        this.toastr.success(data.message);

        //   let details={

        //     //adminName:this.adminName,
        //     userId:this.expenseId,
        //     expenseId:this.expenseId,
        //     expenseTitle:this.expenseTitle,
        //     allGroupUsers:this.allGroupUsers

        // }
        // console.log(details);

        // if(details){
        //   this.socketService.emitUpdateNotification(details);
        // }


        setTimeout(() => {
          this.router.navigate(['/userdashboard']);

        }, 1000)


      },
      err => {

        this.toastr.error('some error occured');
      }
    )
  }
  //edit code is end


  //delete code is start
  public deleteExpense = () => {

    this.expenseHttpService.deleteExpense(this.expenseId).subscribe(

      data => {
        this.toastr.success(data.message);
        //    let details={
        //     //adminName:this.adminName,
        //     userId:this.userId,
        //     expenseId:this.expenseId,
        //     expenseTitle:this.expenseTitle,
        //     allGroupUsers:this.allGroupUsers
        // }
        // this.socketService.emitDeleteNotification(details);
     
        this.router.navigate(['/userdashboard']);
      },
      err => {
        this.toastr.error('some error occured');
      }
    )
  }
  
  public goBack() {
    this.location.back();
  }

  //logout code start
  public logout = () => {
    //this.socketService.exitsocket();
    // this.socketService.disconnectedSocket();
    Cookie.delete('authToken');
    Cookie.delete('userId');
    Cookie.delete('userName');
    this.toastr.success('logout successfully');
    setTimeout(() => {
      this.router.navigate(['/signin']);
    }, 1000);
  }


}
