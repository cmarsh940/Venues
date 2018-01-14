import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AmmenityService } from '../../../services/ammenity.service';
import { User } from '../../../models/user';
import { Ammenity } from '../../../models/ammenity';

@Component({
  selector: 'app-ammenity-edit',
  templateUrl: './ammenity-edit.component.html',
  styleUrls: ['./ammenity-edit.component.css']
})
export class AmmenityEditComponent implements OnInit {
  ammenity = new Ammenity();
  current_user: User;
  ammenities_list: Array<Ammenity>;

  constructor(
    private _route: ActivatedRoute,
    private _ammenityService: AmmenityService,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn();
    // this.getAmmenities();
    this.getRouteParams();
  }

  isLoggedIn() {
    if (this._userService.getCurrentUser() == null) {
      this._router.navigateByUrl('/');
    }
  }

  // getAmmenities() {
  //   this._ammenityService
  //     .get_ammenities()
  //     .then(data => {
  //       this.ammenities_list = data;
  //     })
  //     .catch((err: HttpErrorResponse) => {
  //       if (err.error instanceof Error) {
  //         // A client-side or network error occurred. Handle it accordingly.
  //         console.log("An error occurred:", err.error.message);
  //       } else {
  //         // The backend returned an unsuccessful response code.
  //         // The response body may contain clues as to what went wrong,
  //         console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
  //       }
  //     });
  // }

  getRouteParams() {
    this._route.params.subscribe(param => {
      console.log("*** Request to get one ammenity from client");
      console.log("*** Param id is:", param.id);
      this._ammenityService
        .get_one(param.id)
        .then(data => {
          this.ammenity = data;
        })
        .catch((err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log("An error occurred:", err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
        });
    });
  }
  update(ammenity) {
    this._ammenityService.update_ammenity(this.ammenity);
    this._router.navigate(['/list_ammenity']);
  }
}
