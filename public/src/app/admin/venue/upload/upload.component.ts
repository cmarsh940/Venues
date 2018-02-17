import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models/user';
import { Venue } from '../../../models/venue';
import { UserService } from '../../../services/user.service';
import { VenueService } from '../../../services/venue.service';


@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"]
})
export class UploadComponent implements OnInit, OnDestroy {
  venue = new Venue();
  currentUser: User;
  subscription: Subscription;
  dataLoading: boolean;
  errors = [];
  progressBarValue;

  @ViewChild("files") file_input;
  @ViewChild("form") my_form;
  @Output() newVenue_event = new EventEmitter();

  constructor(
    private _venueService: VenueService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.dataLoading = true;
    this.isLoggedIn();
    this.getVenue();
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

  getVenue() {
    this.subscription = this._activatedRoute.params.subscribe(params =>
      this._venueService.showVenue(params.id, res => (this.venue = res))
    );
  }

  // chooseFiles(event) {
  //   this.selectedFiles = event.target.files;
  //   if (this.selectedFiles.item(0)) this.uploadPic();
  // }

  uploadOne() {
    this.errors = [];
    if (this._userService.getCurrentUser() == null) {
      console.log("REPORTED: You do not have administration privilages");
      this._router.navigateByUrl("/");
    } else {
      const files: FileList = this.file_input.nativeElement.files;
      if (files.length === 0) {
        console.log("No File Was Selected");
        return;
      }
      const formData = new FormData(this.my_form.nativeElement);
      formData.append(files[0].name, files[0]);
      return this._venueService.post_to_s3(formData, this.venue, res => {
        console.log("*** returned", res)
        this._router.navigate(["/list_venue"]);
      })
    }
  }

  // uploadMultiple() {
  //   this.errors = [];
  //   console.log("**** THIS.NEWVENUE:", this.venue);
  //   if (this._userService.getCurrentUser() == null) {
  //     console.log("REPORTED: You do not have administration privilages");
  //     this._router.navigateByUrl("/");
  //   } else {
  //     const files: FileList = this.file_input.nativeElement.files;
  //     if (files.length === 0) {
  //       console.log("No File Was Selected");
  //       return;
  //     }
  //     const formData = new FormData(this.my_form.nativeElement);
  //     formData.append(files[0].name, files[0]);
  //     this._venueService.post_to_s3(formData, venue => {
  //       if (venue.errors) {
  //         for (const key of Object.keys(venue.errors)) {
  //           const errors = venue.errors[key];
  //           this.errors.push(errors.message);
  //         }
  //       } 
  //     });
  //   }
  // }
}
