import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Venue } from '../../models/venue';
import { VenueService } from '../../services/venue.service';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';

import { AgmMap } from '@agm/core/directives/map';
import { google } from '@agm/core/services/google-maps-types';

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
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private location: Location
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

}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}