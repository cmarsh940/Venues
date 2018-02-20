import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Vender } from '../../../../models/vender';
import { Venue } from '../../../../models/venue';
import { VenueService } from '../../../../services/venue.service';
import { VenderService } from '../../../../services/vender.service';

@Component({
  selector: "app-historic",
  templateUrl: "./historic.component.html",
  styleUrls: ["./historic.component.css"],
  preserveWhitespaces: false
})
export class HistoricComponent implements OnInit {
  vender: Vender[] = [];
  venderTwo: Vender[] = [];
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
      if (this.random === this.randomTwo) {
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

  getVenues(): void {
    this._venueService.getSingleVenue("", venues => (this.venues = venues));
    console.log(this.venues);
  }
}
interface marker {
  icon: string;
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
