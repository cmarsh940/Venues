import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Venue } from '../../models/venue';
import { VenueService } from '../../services/venue.service';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit, OnDestroy {

  v = new Venue();
  subscription: Subscription;

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
      params => this._venueService.showVenue(params.id, res => this.v = res)
    );
  }

  goBack(): void {
    this.location.back();
  }

}
