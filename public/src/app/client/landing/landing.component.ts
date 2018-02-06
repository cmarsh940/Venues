import { VenderService } from './../../services/vender.service';
import { Component, OnInit } from '@angular/core';
import { Vender } from '../../models/vender';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { VenueService } from '../../services/venue.service';
import { Venue } from '../../models/venue';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  venders: Array<Vender>;
  categories: Array<Category>
  venues: Array<Venue>
  
  constructor(
    private _venderService: VenderService,
    private _categoryService: CategoryService,
    private _venueService: VenueService,
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getVenues();
    this.getVenders();
  }

  getCategories(): void {
    this._categoryService.getCategories((categories) => this.categories = categories)
  }

  getVenues(): void {
    this._venueService.getVenues((venues) => this.venues = venues)
  }

  getVenders(): void {
    this._venderService.getVenders((venders) => this.venders = venders.slice(0, 4));
  }

}
