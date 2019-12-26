import { Component, OnInit } from '@angular/core';
import { UserHttpService } from 'src/app/user-http.service';
import { CookieService } from 'ng2-cookies';
import { Router } from '@angular/router';
import { GroupHttpService } from 'src/app/group-http.service';
import { groupData } from 'src/app/shared/groupData';
//import{FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css'],
  providers:[CookieService]
})
export class CreateGroupComponent implements OnInit {

  public userId:string;

public userid: any;
public groupTitle: any;
public groupDescription: any;
 public usersList: any;
 public groupUsers: Array<object>;
 public createdBy:any;

  constructor(public userHttpService: UserHttpService, public groupHttpService:GroupHttpService,public cookie: CookieService, public router: Router) {
  }

  ngOnInit() {
      this.getAllUsers();
      this.userId = this.cookie.get('_id');
      console.log('userId: ' + this.userId);
  }

  public getAllUsers = () => {
    this.userHttpService.getAllUsers().subscribe((apiresponse) => {
    this.usersList = apiresponse.data;
    console.log(this.usersList);
    });

  }

  public createGroup = () => {

    let userId = this.cookie.get('_id');

    // this.selectedusers.push(u);
    console.log('arr: ' + this.groupUsers);
   
    // let groupUsersData=[];

    // for(let elem of this.groupUsers) //array is your array variable, i suppose
    // groupUsersData.push({_id: elem}); 

    const data:groupData = {
      groupName: this.groupTitle,
      groupDescription:this.groupDescription,
      createdBy: this.userId,
      users: this.groupUsers
    };

    this.groupHttpService.createGroup(data).subscribe((apiresponse) => {
      console.log('groupid: ' + apiresponse.data.groupId);

      this.router.navigate(['/userdashboard']);

    });
  }

}
