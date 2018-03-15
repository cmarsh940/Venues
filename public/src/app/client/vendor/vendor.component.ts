import { VendorCategory } from './../../models/vendor-category';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VendorService } from '../../services/vendor.service';
import { Vendor } from "./../../models/vendor";
import { VendorCategoryService } from '../../services/vendor-category.service';

@Component({
  selector: "app-vendor",
  templateUrl: "./vendor.component.html",
  styleUrls: ["./vendor.component.css"],
  preserveWhitespaces: false
})
export class VendorComponent implements OnInit {
  vendor = new Vendor();
  vendorCategories: Array<VendorCategory>;;
  subscription: Subscription;
  loaded: Boolean = false;

  constructor(
    private _vendorService: VendorService,
    private _vendorCategoryService: VendorCategoryService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.loaded = false;
    this.getCategories();
    this.getVendor();
    setTimeout(() => {
      this.loaded = true;
    }, 1000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getVendor() {
    this.subscription = this._activatedRoute.params.subscribe(params =>
      this._vendorService.showVendor(params.id, res => (this.vendor = res))
    );
  }

  getCategories(): void {
    this._vendorCategoryService.getCategories(
      vendorCategories => (this.vendorCategories = vendorCategories)
    );
  }

  goBack(): void {
    this.location.back();
  }
}
