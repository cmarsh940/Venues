import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { VenueService } from '../../services/venue.service';
import { Venue } from '../../models/venue';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class Dialog {
  venue: any;
  venues: Array<Venue>;

  constructor(
    private _venueService: VenueService,
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  // getVenues(): void {
  //   this._venueService.get_venues().subscribe(venues => (this.venues = venues));
  // }

  // delete(venue) {
  //   this._venueService.destroy_venue(venue)
  //     .then(() => {
  //       this.getVenues();
  //     })
  //     .catch((err: HttpErrorResponse) => {
  //       if (err.error instanceof Error) {
  //         // A client-side or network error occurred. Handle it accordingly.
  //         console.log("An error occurred:", err.error.message);
  //       } else {
  //         // The backend returned an unsuccessful response code.
  //         // The response body may contain clues as to what went wrong,
  //         console.log(
  //           `Backend returned code ${err.status}, body was: ${err.error}`
  //         );
  //       }
  //     });
  // }

  // onNoClick(): void {
  //   console.log("*** This is the data from the dialog", this.data)
  //   this.dialogRef.close();
  // }

}
