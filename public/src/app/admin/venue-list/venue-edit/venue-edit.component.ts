import { VenueService } from './../../../services/venue.service';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../../models/user';
import { Venue } from '../../../models/venue';

@Component({
  selector: 'app-venue-edit',
  templateUrl: './venue-edit.component.html',
  styleUrls: ['./venue-edit.component.css']
})
export class VenueEditComponent implements OnInit {
  venue = new Venue();
  current_user: User;
  venue_list: Array<Venue>;
  // venues: Venue[];


  // @Input() venue: Venue;

  constructor(
    private _route: ActivatedRoute,
    private _venueService: VenueService,
    private _userService: UserService,
    private _router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.isLoggedIn();
    this.getVenues();
    this.getRouteParams();
  }

  isLoggedIn() {
    if (this._userService.getCurrentUser() == null) {
      this._router.navigateByUrl('/');
    }
  }

  // getVenue(): void {
  //   const id = +this._route.snapshot.paramMap.get("id");
  //   this._venueService.get_one(id).subscribe(venue => (this.venue = venue));
  // }

  getVenues() {
    this._venueService.get_all_venues()
      .then(data => {
        this.venue_list = data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  // getVenues(): void {
  //   this._venueService.get_venues().subscribe(venues => (this.venues = venues));
  // }

  getRouteParams() {
    this._route.params.subscribe(param => {
      console.log("request to get one venue from client");
      console.log(param.id);
      this._venueService
        .get_one(param.id)
        .then(data => {
          this.venue = data;
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  update(venue) {
    this._venueService.update_venue(this.venue);
    this._router.navigate(['/list_venue']);
  }

  goBack(): void {
    this.location.back();
  }
}
