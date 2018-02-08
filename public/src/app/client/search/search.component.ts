import { Component, OnInit } from '@angular/core';
import { AgmMap } from '@agm/core/directives/map';
import { google } from '@agm/core/services/google-maps-types';

import { VenueService } from '../../services/venue.service';
import { VenderService } from './../../services/vender.service';
import { Venue } from '../../models/venue';
import { Vender } from '../../models/vender';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  venders: Array<Vender>
  vender: Vender[] = [];
  vender2: Vender[] = [];
  venues: Array<Venue>;
  search_text: String = "";
  finished: boolean;
  random: number;
  random2: number;

  zoom: number = 8;
  latitude: number;
  longitude: number;
  title: string;

  constructor(
    private _venderService: VenderService,
    private _venueService: VenueService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.finished = false;
    this.getVenders();
    this.getVenues();
    this.finished = true;
  }

  getVenders() {
    this._venderService.getVenders((venders) => {
      this.random = Math.floor((Math.random() * venders.length));
      this.random2 = Math.floor((Math.random() * venders.length));
      this.vender = venders[this.random];
      this.vender2 = venders[this.random2];
      console.log("Random number:" + this.random);
      console.log("Random2 number:" + this.random2);
      console.log(this.vender);
      console.log(this.vender2);
    });
  }

  

  getVenues(): void {
    this._venueService.getVenues((venues) => this.venues = venues)
  }
}


interface marker {
  icon: string;
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}