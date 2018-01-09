import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { VenueService } from '../../services/venue.service';
import { Venue } from '../../models/venue';
import { AmmenityService } from '../../services/ammenity.service';
import { Ammenity } from '../../models/ammenity';

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"]
})
export class AdminDashboardComponent implements OnInit {
  venues: Array<Venue>
  ammenities: Array<Ammenity>

  constructor(
    private _userService: UserService,
    private _venueService: VenueService,
    private _ammenityService: AmmenityService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getVenues();
    this.getAmmenities();
  }

  getVenues() {
    this._venueService.get_venues()
      .then(data => {
        this.venues = data;
      })
      .catch(err => {
        console.log(err);
      });
  }
  getAmmenities() {
    this._ammenityService.get_ammenities()
      .then(data => {
        this.ammenities = data;
      })
      .catch(err => {
        console.warn(err.responseText);
        console.log(err);
      });
  }
}
