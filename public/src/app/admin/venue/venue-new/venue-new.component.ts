import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user';
import { Venue } from '../../../models/venue';
import { VenueService } from '../../../services/venue.service';
import { AmenityService } from '../../../services/amenity.service';
import { Amenity } from '../../../models/amenity';
import { FormControl } from '@angular/forms';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';


@Component({
  selector: 'app-venue-new',
  templateUrl: './venue-new.component.html',
  styleUrls: ['./venue-new.component.css']
})
export class VenueNewComponent implements OnInit {
  currentUser: User;
  venues: Venue[];
  amenities: Amenity[];
  categories: Category[];
  newVenue: Venue = new Venue();
  errors: string[] = [];

  amenityControl= new FormControl();
  
  constructor(
    private _userService: UserService,
    private _venueService: VenueService,
    private _amenityService: AmenityService,
    private _categoryService: CategoryService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn();
    this.getVenues();
    this.getAmenities();
    this.getCategories();
  }

  isLoggedIn() {
    if (this._userService.getCurrentUser() == null) {
      console.log("You are not logged in with admin privlages", sessionStorage)
      this._router.navigateByUrl('/dashboard');
    }
  }

  validateSession(): void {
    if (!this.currentUser) {
      this._router.navigateByUrl('/');
    }
  }

  getVenues(): void {
    this._venueService.getVenues((venues) => this.venues = venues);
  }
  getAmenities(): void {
    this._amenityService.getAmenities((amenities) => this.amenities = amenities);
  }
  getCategories(): void {
    this._categoryService.getCategories((categories) => this.categories = categories);
  }

  createVenue() {
    this.errors = [];
    return this._venueService.createVenue(this.newVenue, (venue) => {
      console.log(venue);
      if (venue.errors) {
        for (let key in venue.errors) {
          let error = venue.error[key];
          this.errors.push(error.message);
        }
      } else {
        this.getVenues();
        this._router.navigate(['/list_venue']);
      }
    })
  }
}