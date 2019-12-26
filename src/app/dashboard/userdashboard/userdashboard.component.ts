import { Component, OnInit } from '@angular/core';
import { GroupHttpService } from 'src/app/group-http.service';
import { CookieService } from 'ng2-cookies';
import { ExpenseHttpService } from 'src/app/expense-http.service';


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
  public user_Id

  constructor(public GroupHttpService: GroupHttpService, public expenseHttpService:ExpenseHttpService,public cookie: CookieService) {

   }

  ngOnInit() {
    this.user_Id = this.cookie.get('_id');
    this.getOutstandingBalances();
    this.getAllGroupsForUser();
  }

  public getOutstandingBalances=() =>{

      this.expenseHttpService.getOutstandingBalances(this.user_Id).subscribe((apiresponse)=>{
        console.log('apiresponse: ' + apiresponse);

      })
  }


  public getAllGroupsForUser = () => {

    
    console.log('userId: ' + this.user_Id);

    this.GroupHttpService.getAllGroupsForaUser(this.user_Id).subscribe((apiresponse) => {
      console.log('apiresponse: ' + apiresponse);
      
      this.groups = apiresponse.data;
      console.log('groups: ' + this.groups);

      
    });
  

  }
}
