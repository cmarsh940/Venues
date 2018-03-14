import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { VenueService } from '../../../../services/venue.service';
import { Venue } from '../../../../models/venue';
import { Vendor } from '../../../../models/vendor';
import { VendorService } from '../../../../services/vendor.service';

@Component({
  selector: "app-barn",
  templateUrl: "./barn.component.html",
  styleUrls: ["./barn.component.css"],
  preserveWhitespaces: false
})
export class BarnComponent implements OnInit {
  vendor = new Vendor();
  vendorTwo = new Vendor();
  venues: Array<Venue>;
  search_text: String = "";
  finished: boolean;
  random: number;
  randomTwo: number;
  loaded: Boolean = false;

  zoom: number = 8;
  latitude: number;
  longitude: number;
  title: string;

  constructor(
    private _vendorService: VendorService,
    private _venueService: VenueService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.loaded = false;
    this.finished = true;
    this._vendorService.getVendors(vendor => {
      this.finished = false;
      this.random = Math.floor(Math.random() * vendor.length);
      this.randomTwo = Math.floor(Math.random() * vendor.length);
      console.log("Random number:", this.random);
      console.log("RandomTwo number:", this.randomTwo);
      if (this.random === this.randomTwo) {
        this.randomTwo = Math.floor(Math.random() * vendor.length);
        console.log("Random number:", this.random);
        console.log("RandomTwo number:", this.randomTwo);
      } else {
        this.vendor = vendor[this.random];
        console.log(this.vendor);
        this.vendorTwo = vendor[this.randomTwo];
        console.log(this.vendorTwo);
      }
    });
    // setTimeout(() => {
    //   this.loaded = true;
    // }, 1000);
    this.getVenues();
    this.loaded = true;
  }

  getVendors() {
    this._vendorService.getVendors(vendor => {
      this.random = Math.floor(Math.random() * vendor.length);
      console.log("Random number:", this.random);
      this.vendor = vendor[this.random];
      console.log(this.vendor);
      this.randomTwo = Math.floor(Math.random() * vendor.length);
      console.log("RandomTwo number:", this.randomTwo);
      this.vendorTwo = vendor[this.randomTwo];
      console.log(this.vendorTwo);
    });
  }

  getVenues(): void {
    this._venueService.getVenues(venues => (this.venues = venues));
  }
}


interface marker {
  icon: string;
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}