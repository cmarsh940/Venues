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

@Component({
  selector: 'app-venue-edit',
  templateUrl: './venue-edit.component.html',
  styleUrls: ['./venue-edit.component.css']
})
export class VenueEditComponent implements OnInit, OnDestroy {
  venue = new Venue();
  currentUser: User;
  subscription: Subscription;
  categories: Category[];
  
  constructor(
    private _route: ActivatedRoute,
    private _venueService: VenueService,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.isLoggedIn();
    this.getVenues();
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

  updateVenue() {
    this._venueService.updateVenue(this.venue, res => {
      this._router.navigate(['/list_venue']);
    });
  }

  getCategories(): void {
    this._categoryService.getCategories((categories) => this.categories = categories);
  }

  goBack(): void {
    this.location.back();
  }

}
