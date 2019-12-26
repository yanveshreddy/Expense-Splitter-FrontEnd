import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';
import { UserHttpService } from 'src/app/user-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public email: any;
  public password: any;
 


  constructor(public toastr: ToastrService, public service: UserHttpService, public router: Router) { }

  ngOnInit() {

   // this.toastr.success("Welcome");
  }

  public signin = () => {
    if (!this.email) {
      this.toastr.warning('Please Enter Email')
    }
    else if (!this.password) {
      this.toastr.warning('Please Enter Password');
    }
    else {

      let postingdata = {
        email: this.email,
        password: this.password
      }
    
      this.service.signinfunction(postingdata).subscribe(
        result => {

          if (result.error == false) {
           
            console.log(result);
            this.toastr.success(result.message);

            console.log(result.data);

            Cookie.set('authToken', result.data.authToken);

            Cookie.set('userId', result.data.userDetails.userId);
            Cookie.set('_id', result.data.userDetails._id);

            Cookie.set('userName', result.data.userDetails.firstName + ' ' + result.data.userDetails.lastName);

            this.service.setUserInfoInLocalStorage(result.data.userDetails);
            
                setTimeout(()=>{
                  // this.router.navigate(['/userdashboard', result.data.userDetails.userId]);
                  this.router.navigate(['userdashboard']);
                },1000)
            
          }
          else {
          
            this.toastr.error(result.message);
          }
        }, err => {

          this.toastr.error('some error occured');
        }
      )
    }
  }
  //signin code end

}



