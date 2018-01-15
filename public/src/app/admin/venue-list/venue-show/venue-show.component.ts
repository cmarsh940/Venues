import { DialogService } from './../../../services/dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { VenueService } from './../../../services/venue.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../../models/user';
import { Venue } from '../../../models/venue';

@Component({
  selector: 'app-venue-show',
  templateUrl: './venue-show.component.html',
  styleUrls: ['./venue-show.component.css']
})
export class VenueShowComponent implements OnInit {
  venues: Venue[];
  current_user: User;
  search_text: String = '';

  constructor(
    private _venueService: VenueService,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn();
    this.getVenues();
  }

  isLoggedIn() {
    if (this._userService.getCurrentUser() == null) {
      this._router.navigateByUrl('/');
    }
  }


  // getVenues() {
  //   this._venueService.get_venues()
  //     .then(data => {
  //       this.venue_list = data;
  //     })
  //     .catch((err: HttpErrorResponse) => {
  //       if (err.error instanceof Error) {
  //         // A client-side or network error occurred. Handle it accordingly.
  //         console.log("An error occurred:", err.error.message);
  //       } else {
  //         // The backend returned an unsuccessful response code.
  //         // The response body may contain clues as to what went wrong,
  //         console.log(
  //           `Backend returned code ${err.status}, body was: ${err.error}`
  //         );
  //       }
  //     });
  // }

  getVenues(): void {
    this._venueService.get_venues().subscribe(venues => (this.venues = venues));
  }

  delete(venue) {
    this._venueService
      .destroy_venue(venue)
      .then(() => {
        this.getVenues();
      })
      .catch(err => {
        console.log('the error is: ', err);
      });
  }
}


