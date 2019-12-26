import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Cookie} from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  
  constructor( private _route: ActivatedRoute, 
    private router: Router,private toastr:ToastrService) { }

  ngOnInit() {
  }
  //logout code start
public logout=()=>{
 // this.socketService.exitsocket();
  //this.socketService.disconnectedSocket();
  Cookie.delete('authToken');
  Cookie.delete('userId');
  Cookie.delete('userName');
  this.toastr.success('logout successfully');
  setTimeout(() => {
    this.router.navigate(['/signin']);
  },1000);
}
 //logout code end

}
