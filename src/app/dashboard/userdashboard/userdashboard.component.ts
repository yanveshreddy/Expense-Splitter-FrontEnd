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
  public outStandingAmount:any;

  public isValid:boolean;

  constructor(public GroupHttpService: GroupHttpService, public expenseHttpService:ExpenseHttpService,public cookie: CookieService) {

   }

  ngOnInit() {
    this.user_Id = this.cookie.get('_id');

    this.getAllGroupsForUser();
    this.getUserOutstandingLent();
  }

  public getUserOutstandingLent=() =>{

      this.expenseHttpService.getUserOutstandingLent(this.user_Id).subscribe((apiResponse:any)=>{

        console.log('apiResponse: ' + JSON.stringify(apiResponse.data.totalAmountSpent) );

        let totalAmountLent1=apiResponse.data[0].totalAmountLent;
        this.totalAmountLent=Math.round(totalAmountLent1);

        this.getUserOutstandingSpent(this.totalAmountLent);

      })
  }
  public getUserOutstandingSpent=(totalAmountLent) =>{

    this.expenseHttpService.getUserOutstandingSpent(this.user_Id).subscribe((apiResponse:any)=>{
      console.log('apiResponse: ' + apiResponse.data.totalAmountSpent);

      let totalAmountSpent1=apiResponse.data[0].totalAmountSpent;
      this.totalAmountSpent=Math.round(totalAmountSpent1)
  
      this.getUserOutstandingBalance(totalAmountLent,this.totalAmountSpent)
      

    })
}

  public getAllGroupsForUser = () => {

    
    console.log('user_Id: ' + this.user_Id);

    this.GroupHttpService.getAllGroupsForaUser(this.user_Id).subscribe((apiResponse) => {
      console.log('apiResponse: ' + apiResponse);
      
      this.groups = apiResponse.data;
    

      
    });
  

  }

  public getUserOutstandingBalance =(totalAmountLent,totalAmountSpent) =>{

    // if(this.totalAmountSpent != null && this.totalAmountSpent != undefined && this.totalAmountLent !=null && this.totalAmountLent !=undefined)
    // {
      
      let outStandingAmount1=Math.round(totalAmountLent) - Math.round(totalAmountSpent);
      this.outStandingAmount=Math.abs(outStandingAmount1);
      if(outStandingAmount1>=0)
      {
        this.isValid=true
      }
      else{
        this.isValid=false;
      }
      console.log('outStandingAmount: ' + this.outStandingAmount);
    
  }
}
