import { Component, OnInit } from '@angular/core';
import { GroupHttpService } from 'src/app/group-http.service';
import { CookieService } from 'ng2-cookies';
import { ExpenseHttpService } from 'src/app/expense-http.service';
import { SplitInterpolation } from '@angular/compiler';


@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css'],
  providers:[CookieService]
})
export class UserdashboardComponent implements OnInit {

  public userInfo: any;
  public groups: [];
  //public routerLinkVariable = '../creategroup';
  public user_Id;

  public totalAmountLent:any;
  public totalAmountSpent:any;
  public outStandingDisplay:any;

  constructor(public GroupHttpService: GroupHttpService, public expenseHttpService:ExpenseHttpService,public cookie: CookieService) {

   }

  ngOnInit() {
    this.user_Id = this.cookie.get('_id');

    this.getUserOutstandingLent();
    this.getUserOutstandingSpent();
    this.getAllGroupsForUser();

  }

  public getUserOutstandingLent=() =>{

      this.expenseHttpService.getUserOutstandingLent(this.user_Id).subscribe((apiResponse:any)=>{
        console.log('apiResponse: ' + JSON.stringify(apiResponse.data.totalAmountSpent) );

        this.totalAmountLent=apiResponse.data[0].totalAmountLent;


      })
  }
  public getUserOutstandingSpent=() =>{

    this.expenseHttpService.getUserOutstandingSpent(this.user_Id).subscribe((apiResponse:any)=>{
      console.log('apiResponse: ' + apiResponse.data.totalAmountSpent);
      this.totalAmountSpent=apiResponse.data[0].totalAmountSpent;

    })
}

  public getAllGroupsForUser = () => {

    
    console.log('user_Id: ' + this.user_Id);

    this.GroupHttpService.getAllGroupsForaUser(this.user_Id).subscribe((apiResponse) => {
      console.log('apiResponse: ' + apiResponse);
      
      this.groups = apiResponse.data;
      console.log('groups: ' + this.groups);

      
    });
  

  }
}
