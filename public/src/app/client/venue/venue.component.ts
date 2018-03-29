import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router, ActivatedRoute } from '@angular/router';
import { Venue } from '../../models/venue';
import { VenueService } from '../../services/venue.service';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';

import { AgmMap } from '@agm/core/directives/map';
import { google } from '@agm/core/services/google-maps-types';
import { Amenity } from '../../models/amenity';
import { AmenityService } from '../../services/amenity.service';

import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';
import { CdkOverlayOrigin, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { CdkPortal, ComponentPortal, Portal } from '@angular/cdk/portal';
import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { filter } from 'rxjs/operators/filter';
import { tap } from 'rxjs/operators/tap';
import { MatSidenav } from "@angular/material";
import { Vendor } from '../../models/vendor';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: "app-venue",
  templateUrl: "./venue.component.html",
  styleUrls: ["./venue.component.css"],
  preserveWhitespaces: false
})
export class VenueComponent implements OnInit, OnDestroy {
  venue = new Venue();
  vendor = new Vendor();
  subscription: Subscription;
  random: number;
  approved = Boolean;
  loaded: Boolean = false;
  rating: number;
  total = 0;

  // OVERLAY & PORTAL
  nextPosition: number = 0;
  isMenuOpen: boolean = false;

  // MAP
  zoom: number = 12;
  latitude: number;
  longitude: number;
  title: string;


  @ViewChild("sidenav") sidenav: MatSidenav;

  @ViewChildren(CdkPortal) templatePortals: QueryList<Portal<any>>;
  @ViewChild(CdkOverlayOrigin) _overlayOrigin: CdkOverlayOrigin;

  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _venueService: VenueService,
    private _vendorService: VendorService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private location: Location,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loaded = false;
    this.getVendor();
    this.getVenue();
    console.log(this.venue);
    // this.average();
    setTimeout(() => {
      this.loaded = true;
    }, 1000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getVenue() {
    this.subscription = this._activatedRoute.params.subscribe(params =>
      this._venueService.showVenue(params.id, res => (this.venue = res))
    );
  }

  getVendor() {
    this._vendorService.getVendors(vendor => {
      this.random = Math.floor(Math.random() * vendor.length);
      this.vendor = vendor[this.random];
    });
  }

  goBack(): void {
    this.location.back();
  }

  openPanelWithBackdrop() {
    let config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: "cdk-overlay-transparent-backdrop",
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
    });

    let overlayRef = this.overlay.create(config);
    overlayRef.attach(this.templatePortals.first);
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }

  average() {
    for (var i = 0; i < this.venue.reviews.length; i++) {
      this.total += this.venue.reviews[i].rating;
    }
    var avg = this.total / this.venue.reviews.length;
  }
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}