import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VendorService } from '../../services/vendor.service';
import { Vendor } from "./../../models/vendor";

@Component({
  selector: "app-vendor",
  templateUrl: "./vendor.component.html",
  styleUrls: ["./vendor.component.css"],
  preserveWhitespaces: false
})
export class VendorComponent implements OnInit {
  vendor = new Vendor();
  subscription: Subscription;
  loaded: Boolean = false;

  constructor(
    private _vendorService: VendorService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.loaded = false;
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

  goBack(): void {
    this.location.back();
  }
}
