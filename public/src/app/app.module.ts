import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatMenuModule, MatAutocompleteModule, MatButtonToggleModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatInputModule, MatListModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatTooltipModule, MatStepperModule } from '@angular/material';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './client/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { VenueSearchComponent } from './client/venue-search/venue-search.component';
import { VenueListComponent } from './admin/venue-list/venue-list.component';
import { VenueEditComponent } from './admin/venue-list/venue-edit/venue-edit.component';
import { VenueNewComponent } from './admin/venue-list/venue-new/venue-new.component';
import { VenueShowComponent } from './admin/venue-list/venue-show/venue-show.component';
import { VenueService } from './services/venue.service';
import { VenueComponent } from './client/venue/venue.component';
import { AmmenityListComponent } from './admin/ammenity-list/ammenity-list.component';
import { AmmenityNewComponent } from './admin/ammenity-list/ammenity-new/ammenity-new.component';
import { AmmenityEditComponent } from './admin/ammenity-list/ammenity-edit/ammenity-edit.component';
import { AmmenityShowComponent } from './admin/ammenity-list/ammenity-show/ammenity-show.component';
import { AmmenityService } from './services/ammenity.service';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ClientComponent,
    FooterComponent,
    NavComponent,
    LoginComponent,
    DashboardComponent,
    AdminDashboardComponent,
    AdminNavComponent,
    VenueSearchComponent,
    VenueListComponent,
    VenueEditComponent,
    VenueNewComponent,
    VenueShowComponent,
    VenueComponent,
    AmmenityListComponent,
    AmmenityNewComponent,
    AmmenityEditComponent,
    AmmenityShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    ReactiveFormsModule
  ],
  providers: [UserService, VenueService, AmmenityService],
  bootstrap: [AppComponent]
})
export class AppModule {}
