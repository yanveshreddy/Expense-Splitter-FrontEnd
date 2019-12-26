import { Component, OnInit } from '@angular/core';
import { GroupHttpService } from 'src/app/group-http.service';
import { CookieService } from 'ng2-cookies';


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


  constructor(public GroupHttpService: GroupHttpService, public cookie: CookieService) {

   }

  ngOnInit() {
    this.getAllGroupsForUser();
  }

  public getAllGroupsForUser = () => {

    const user_Id = this.cookie.get('_id');
    console.log('userId: ' + user_Id);

    this.GroupHttpService.getAllGroupsForaUser(user_Id).subscribe((apiresponse) => {
      console.log('apiresponse: ' + apiresponse);
      
      this.groups = apiresponse.data;
      console.log('groups: ' + this.groups);

      
    });
  

  }
}
