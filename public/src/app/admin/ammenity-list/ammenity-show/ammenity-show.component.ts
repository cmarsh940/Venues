import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AmmenityService } from '../../../services/ammenity.service';
import { User } from '../../../models/user';
import { Ammenity } from '../../../models/ammenity';

@Component({
  selector: "app-ammenity-show",
  templateUrl: "./ammenity-show.component.html",
  styleUrls: ["./ammenity-show.component.css"]
})
export class AmmenityShowComponent implements OnInit {
  ammenities_list: Array<Ammenity>;
  current_user: User;
  search_text: String = "";

  constructor(
    private _ammenityService: AmmenityService,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn();
    this.getAmmenities();
  }

  isLoggedIn() {
    if (this._userService.getCurrentUser() == null) {
      this._router.navigateByUrl("/");
    }
  }

  getAmmenities() {
    this._ammenityService.get_ammenities()
      .then(data => {
        this.ammenities_list = data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  delete(ammenity) {
    this._ammenityService
      .destroy_ammenity(ammenity)
      .then(() => {
        this.getAmmenities();
      })
      .catch(err => {
        console.log("the error is: ", err);
      });
  }
}
