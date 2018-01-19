import { environment } from './../environments/environment.prod';
import { VenueShowComponent } from './admin/venue-list/venue-show/venue-show.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { FooterComponent } from './structure/footer/footer.component'
import { NavComponent } from './structure/nav/nav.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './client/dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminNavComponent } from './structure/admin-nav/admin-nav.component';
import { VenueSearchComponent } from './client/venue-search/venue-search.component';
import { VenueListComponent } from './admin/venue-list/venue-list.component';
import { VenueEditComponent } from './admin/venue-list/venue-edit/venue-edit.component';
import { VenueNewComponent } from './admin/venue-list/venue-new/venue-new.component';
import { VenueComponent } from './client/venue/venue.component';
import { AmmenityListComponent } from './admin/ammenity-list/ammenity-list.component';
import { AmmenityEditComponent } from './admin/ammenity-list/ammenity-edit/ammenity-edit.component';
import { AmmenityShowComponent } from './admin/ammenity-list/ammenity-show/ammenity-show.component';
import { MessagesComponent } from './messages/messages.component';
import { UploadComponent } from './admin/upload/upload.component';
import { FileDropDirective } from './admin/upload/file-drop.directive';
import { UploadService } from './services/upload.service';
import { UploadFormComponent } from './admin/upload/upload-form/upload-form.component';
import { GoogleMapComponent } from './client/google-map/google-map.component';
import { Dialog } from './messages/popup/popup.component';
import { Rights } from './structure/footer/rights/rights.component'

import { AmmenityService } from './services/ammenity.service';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';
import { VenueService } from './services/venue.service';

import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
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
  MatTooltipModule,
  MatStepperModule
} from '@angular/material';
import { RegisterComponent } from './auth/register/register.component';

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
    AmmenityEditComponent,
    AmmenityShowComponent,
    MessagesComponent,
    UploadFormComponent,
    UploadComponent,
    FileDropDirective,
    GoogleMapComponent,
    Dialog,
    Rights,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
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
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    })
  ],
  entryComponents: [Dialog],
  providers: [
    UserService,
    VenueService,
    AmmenityService,
    MessageService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}