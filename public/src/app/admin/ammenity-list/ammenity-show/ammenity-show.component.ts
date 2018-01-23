import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AmmenityService } from '../../../services/ammenity.service';
import { User } from '../../../models/user';
import { Ammenity } from '../../../models/ammenity';

@Component({
  selector: 'app-ammenity-show',
  templateUrl: './ammenity-show.component.html',
  styleUrls: ['./ammenity-show.component.css']
})
export class AmmenityShowComponent implements OnInit {
  ammenities_list: Array<Ammenity>;
  ammenities: Ammenity[];
  // ammenityName = [];
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
      this._router.navigateByUrl('/');
    }
  }

  getAmmenities(): void {
    this._ammenityService
      .index()
      .subscribe(ammenities => (this.ammenities = ammenities));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this._ammenityService
      .create({ name } as Ammenity)
      .subscribe(ammenity => {
        this.ammenities.push(ammenity);
      });
  }

  // delete(ammenity: Ammenity): void {
  //   this.ammenities = this.ammenities.filter(a => a !== ammenity);
  //   this._ammenityService.delete_ammenity(ammenity).subscribe();
  // }

  delete(ammenity) {
    this._ammenityService.delete(ammenity)
      .then(() => {
        this.getAmmenities();
      })
      .catch((err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log("An error occurred:", err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(
            `Backend returned code ${err.status}, body was: ${err.error}`
          );
        }
      });
  }
}
