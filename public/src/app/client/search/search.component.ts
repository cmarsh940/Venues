import { Component, OnInit } from '@angular/core';
import { AgmMap } from '@agm/core/directives/map';
import { google } from '@agm/core/services/google-maps-types';

import { VenueService } from '../../services/venue.service';
import { VenderService } from './../../services/vender.service';
import { Venue } from '../../models/venue';
import { Vender } from '../../models/vender';
import { Router } from '@angular/router';

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
  preserveWhitespaces: false
})
export class SearchComponent implements OnInit {
  vender = new Vender();
  venderTwo = new Vender();
  venues: Array<Venue>;
  search_text: String = "";
  finished: boolean;
  random: number;
  randomTwo: number;

  zoom: number = 8;
  latitude: number;
  longitude: number;
  title: string;

  constructor(
    private _venderService: VenderService,
    private _venueService: VenueService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.finished = false;
    this.getVenues();
    this._venderService.getVenders(vender => {
      this.finished = false;
      this.random = Math.floor(Math.random() * vender.length);
      this.randomTwo = Math.floor(Math.random() * vender.length);
      console.log("Random number:", this.random);
      console.log("RandomTwo number:", this.randomTwo);
      if(this.random === this.randomTwo) {
        this.randomTwo = Math.floor(Math.random() * vender.length);
        console.log("Random number:", this.random);
        console.log("RandomTwo number:", this.randomTwo);
      } else {
        this.vender = vender[this.random];
        console.log(this.vender);
        this.venderTwo = vender[this.randomTwo];
        console.log(this.venderTwo);
      }
      this.finished = true;
    });
  }

  getVenders() {
    this._venderService.getVenders(vender => {
      this.random = Math.floor(Math.random() * vender.length);
      console.log("Random number:", this.random);
      this.vender = vender[this.random];
      console.log(this.vender);
      this.randomTwo = Math.floor(Math.random() * vender.length);
      console.log("RandomTwo number:", this.randomTwo);
      this.venderTwo = vender[this.randomTwo];
      console.log(this.venderTwo);
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