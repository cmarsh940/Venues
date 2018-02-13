import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Venue } from '../../../models/venue';
import { VenueService } from '../../../services/venue.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { MatTabChangeEvent } from '@angular/material';
// import { FileUploader } from 'ng2-file-upload';
import { Amenity } from '../../../models/amenity';
import { AmenityService } from '../../../services/amenity.service';


const URL = '/upload';

@Component({
  selector: 'app-venue-edit',
  templateUrl: './venue-edit.component.html',
  styleUrls: ['./venue-edit.component.css']
})
export class VenueEditComponent implements OnInit, OnDestroy {
  venue = new Venue();
  amenityList: Amenity[];
  categories: Category[];
  currentUser: User;
  subscription: Subscription;
  fetchItems: any[];
  dataLoading: boolean;

  // public uploader: FileUploader = new FileUploader({ url: URL });
  // public hasBaseDropZoneOver: boolean = false;
  // public hasAnotherDropZoneOver: boolean = false;

  // public fileOverBase(e: any): void {
  //   this.hasBaseDropZoneOver = e;
  // }

  // public fileOverAnother(e: any): void {
  //   this.hasAnotherDropZoneOver = e;
  // }

  
  constructor(
    private _route: ActivatedRoute,
    private _venueService: VenueService,
    private _amenityService: AmenityService,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.dataLoading = true;
    this.isLoggedIn();
    this.getVenues();
    this.getAmenities();
    this.getCategories();
    this.dataLoading = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  getVenues() {
    this.subscription = this._activatedRoute.params.subscribe(
      params => this._venueService.showVenue(params.id, res => this.venue = res)
    );
  }
  getAmenities(): void {
    this._amenityService.getAmenities((amenities) => this.amenityList = amenities);
  }
  getCategories(): void {
    this._categoryService.getCategories((categories) => this.categories = categories);
  }

  updateVenue() {
    this._venueService.updateVenue(this.venue, res => {
      this._router.navigate(['/list_venue']);
    });
  }

  // updateGalleryItems() {
  //   this.dataLoading = true;
  //   console.log('Updating Gallery Items')
  //   this.subscription = this._activatedRoute.params.subscribe(
  //     params => this._venueService.getImages(params.id, res => this.venue = res)
  //   );
  //   this.dataLoading = false;
  // }

  // onLinkClick(tabChangeEvent: MatTabChangeEvent): void {
  //   if (tabChangeEvent.index == 0) {
  //     this.updateGalleryItems();
  //   }
  // }

  

}
