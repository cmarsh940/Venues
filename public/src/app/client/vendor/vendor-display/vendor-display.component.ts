import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Vendor } from '../../../models/vendor';
import { VendorService } from '../../../services/vendor.service';

@Component({
  selector: "app-vendor-display",
  templateUrl: "./vendor-display.component.html",
  styleUrls: ["./vendor-display.component.css"],
  preserveWhitespaces: false
})
export class VendorDisplayComponent implements OnInit {
  vendor = new Vendor();
  subscription: Subscription;
  loaded: Boolean = false;

  constructor(
    private _vendorService: VendorService,
    private _activatedRoute: ActivatedRoute,
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