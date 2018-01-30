import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Venue } from '../../models/venue';
import { VenueService } from '../../services/venue.service';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';

import { AgmMap } from '@agm/core/directives/map';
import { google } from '@agm/core/services/google-maps-types';
import { DigitalTourService } from '../../services/digital-tour.service';
import { Amenity } from '../../models/amenity';
import { AmenityService } from '../../services/amenity.service';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit, OnDestroy {
  venue = new Venue();
  subscription: Subscription;

  zoom: number = 12;
  latitude: number;
  longitude: number;
  title: string;

  constructor(
    private _venueService: VenueService,
    private _amenityService: AmenityService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private location: Location,
    private _digitalTourService: DigitalTourService
  ) { }

  ngOnInit() {
    this.getVenue();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getVenue() {
    this.subscription = this._activatedRoute.params.subscribe(
      params => this._venueService.showVenue(params.id, res => this.venue = res)
    );
  }

  goBack(): void {
    this.location.back();
  }
  show(): void {
    this._digitalTourService.show();
    // this._router.navigateByUrl('/venue/display/:id/3d')
  }

}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}