import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private _userService: UserService,
    private _router: Router,
  ) { }

  ngOnInit() {
    // this.isLoggedIn();
  }

  // isLoggedIn() {
  //   if (this._userService.getCurrentUser() == null) {
  //     this._router.navigateByUrl('/');
  //   }
  // }
  
  logout() {
    console.log("you are logged out");
    sessionStorage.removeItem('currentUser');
  }

}
