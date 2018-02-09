import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AmenityService } from '../../services/amenity.service';
import { VenderService } from '../../services/vender.service';
import { VenueService } from '../../services/venue.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Venue } from '../../models/venue';
import { Vender } from '../../models/vender';
import { Amenity } from '../../models/amenity';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  amenities: Array<Amenity>;
  venders: Array<Vender>;
  venues: Array<Venue>;
  users: Array<User>;

  currentUser: User;

  constructor(
    private _amenityService: AmenityService,
    private _userService: UserService,
    private _venueService: VenueService,
    private _venderService: VenderService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn();
    this.getUsers();
    this.getAmenity();
    this.getVenues();
    this.getVenders();
  }

  isLoggedIn() {
    if (this._userService.getCurrentUser() == null) {
      this._router.navigateByUrl('/');
    }
  }

  validateSession(): void {
    if (this.currentUser == null) {
      this._router.navigateByUrl('/');
    } else {
      console.log(this.currentUser._id);
    }
  }

  getVenders(): void {
    this._venderService.getVenders((venders) => this.venders = venders);
  }

  getVenues(): void {
    this._venueService.getVenues((venues) => this.venues = venues);
  }

  getAmenity(): void{
    this._amenityService.getAmenities((amenities) => this.amenities = amenities);
  }

  getUsers(): void {
    this._userService.getUsers((users) => this.users = users);
  }
}
