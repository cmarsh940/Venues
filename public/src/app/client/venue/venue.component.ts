import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VenueService } from '../../services/venue.service';
import { Venue } from '../../models/venue';
import { Location } from '@angular/common';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit {
  venue = new Venue();
  venue_list: Array<Venue>;

  @ViewChild('sidenav') sidenav: MatSidenav;
  
  constructor(
    private _route: ActivatedRoute,
    private _venueService: VenueService,
    private _router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.getVenues();
    this.getRouteParams();
  }

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
