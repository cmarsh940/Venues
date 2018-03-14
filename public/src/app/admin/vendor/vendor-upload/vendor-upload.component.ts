import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { VendorService } from '../../../services/vendor.service';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';
import { Vendor } from '../../../models/vendor';
import { Location } from "@angular/common";

@Component({
  selector: "app-vendor-upload",
  templateUrl: "./vendor-upload.component.html",
  styleUrls: ["./vendor-upload.component.css"]
})
export class VendorUploadComponent implements OnInit {
  vendor = new Vendor();
  currentUser: User;
  subscription: Subscription;
  dataLoading: boolean;
  errors = [];
  progressBarValue;

  @ViewChild("files") files_input;
  @ViewChild("formMultiple") multiple_form;
  @ViewChild("file") file_input;
  @ViewChild("form") my_form;
  @Output() vendor_event = new EventEmitter();

  constructor(
    private _vendorService: VendorService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.dataLoading = true;
    this.isLoggedIn();
    this.getVendor();
    this.dataLoading = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isLoggedIn() {
    if (this._userService.getCurrentUser() == null) {
      console.log("You are not logged in with admin privlages", sessionStorage);
      this._router.navigateByUrl("/dashboard");
    }
  }

  getVendor() {
    this.subscription = this._activatedRoute.params.subscribe(params =>
      this._vendorService.showVendor(params.id, res => (this.vendor = res))
    );
  }

  uploadOne() {
    this.errors = [];
    if (this._userService.getCurrentUser() == null) {
      console.log("REPORTED: You do not have administration privilages");
      this._router.navigateByUrl("/");
    } else {
      let formData = new FormData(this.my_form.nativeElement);
      this._vendorService.post_to_s3(formData, this.vendor._id, res => {
        this.file_input.nativeElement.value = "";
        this.vendor_event.emit();
        this._router.navigate(["/list_vendor"]);
      });
    }
  }

  uploadMultiple() {
    this.errors = [];
    console.log("**** THIS.NEWVENdor:", this.vendor);
    if (this._userService.getCurrentUser() == null) {
      console.log("REPORTED: You do not have administration privilages");
      this._router.navigateByUrl("/");
    } else {
      const files: FileList = this.files_input.nativeElement.files;
      if (files.length === 0) {
        console.log("No File Was Selected");
        return;
      }
      const formData = new FormData(this.multiple_form.nativeElement);
      formData.append(files[0].name, files[0]);
      this._vendorService.post_multiple_to_s3(formData, this.vendor._id, vendor => {
          if (vendor.errors) {
            for (const key of Object.keys(vendor.errors)) {
              const errors = vendor.errors[key];
              this.errors.push(errors.message);
            }
          }
          this.file_input.nativeElement.value = "";
          this.vendor_event.emit();
          location.reload();
        });
    }
  }
}
