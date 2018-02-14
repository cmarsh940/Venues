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
import { VenderService } from '../../services/vender.service';
import { Vender } from '../../models/vender';

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

@Component({
  selector: "app-venue",
  templateUrl: "./venue.component.html",
  styleUrls: ["./venue.component.css"],
  preserveWhitespaces: false
})
export class VenueComponent implements OnInit, OnDestroy {
  venue = new Venue();
  vender: Vender;
  subscription: Subscription;
  random: number;

  // OVERLAY & PORTAL
  nextPosition: number = 0;
  isMenuOpen: boolean = false;

  // MAP
  zoom: number = 12;
  latitude: number;
  longitude: number;
  title: string;

  @ViewChildren(CdkPortal) templatePortals: QueryList<Portal<any>>;
  @ViewChild(CdkOverlayOrigin) _overlayOrigin: CdkOverlayOrigin;

  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _venueService: VenueService,
    private _venderService: VenderService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private location: Location,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.getVender();
    this.getVenue();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getVenue() {
    this.subscription = this._activatedRoute.params.subscribe(params =>
      this._venueService.showVenue(params.id, res => (this.venue = res))
    );
  }

  getVender() {
    this._venderService.getVenders(vender => {
      this.random = Math.floor(Math.random() * vender.length);
      this.vender = vender[this.random];
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
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}