import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { VenueService } from '../../services/venue.service';
import { Venue } from '../../models/venue';
import { AmmenityService } from '../../services/ammenity.service';
import { Ammenity } from '../../models/ammenity';
import { User } from '../../models/user';
import { VenderService } from '../../services/vender.service';
import { Vender } from '../../models/vender';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  venues: Array<Venue>;
  venders: Array<Vender>;
  ammenities: Array<Ammenity>;
  users: Array<User>;

  constructor(
    private _userService: UserService,
    private _venueService: VenueService,
    private _venderService: VenderService,
    private _ammenityService: AmmenityService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getVenues();
    this.getVenders();
    this.getAmmenities();
    this.getUsers();
  }

  getVenues(): void {
    this._venueService.get_venues().subscribe(venues => (this.venues = venues));
  }
  getVenders(): void {
    this._venderService.get_venders().subscribe(venders => (this.venders = venders));
  }

  getAmmenities(): void {
    this._ammenityService.index().subscribe(ammenities => (this.ammenities = ammenities));
  }

  getUsers(): void {
    this._userService.get_all_users().subscribe(users => (this.users = users));
  }
}
