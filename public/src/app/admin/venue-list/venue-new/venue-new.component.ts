import { AmmenityService } from './../../../services/ammenity.service';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { VenueService } from './../../../services/venue.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models/user';
import { Venue } from '../../../models/venue';
import { Ammenity } from '../../../models/ammenity';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-venue-new',
  templateUrl: './venue-new.component.html',
  styleUrls: ['./venue-new.component.css']
})
export class VenueNewComponent implements OnInit {
  new_venue: Venue = new Venue();
  current_user: User;
  ammenitiesControl = new FormControl();
  ammenitiesList: Array<Ammenity>;
  errors = [];

  @ViewChild('file') file_input;
  @ViewChild('form') my_form;
  @Output() new_venue_event = new EventEmitter();

  constructor(
    private _venueService: VenueService,
    private _userService: UserService,
    private _ammenityService: AmmenityService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn();
    this.getAmmenities();
  }

  isLoggedIn() {
    if (this._userService.getCurrentUser() == null) {
      this._router.navigateByUrl('/');
    }
  }

  getAmmenities(): void {
    this._ammenityService
      .get_ammenities()
      .subscribe(ammenities => (this.ammenitiesList = ammenities));
  }


  create_venue() {
    let form_data = new FormData(this.my_form.nativeElement);

    console.log("*** This is the form data", form_data);
    this._venueService.post_venue(form_data).then(() => {
      console.log("*** Setting new venue");
      this.new_venue = new Venue();
      console.log("*** Setting file value");
      this.file_input.nativeElement.value = "";
      console.log("*** About to emit");
      this.new_venue_event.emit();
      this._router.navigate(['/list_venue']);
    });
  }
}
