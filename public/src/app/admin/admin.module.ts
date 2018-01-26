import { CategoryService } from './../services/category.service';
import { RegisterComponent } from './../auth/register/register.component';
import { AdminNavComponent } from './../structure/admin-nav/admin-nav.component';
import { UserService } from './../services/user.service';
import { VenderService } from './../services/vender.service';
import { AmenityService } from './../services/amenity.service';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VenderEditComponent } from './vender/vender-edit/vender-edit.component';
import { VenderNewComponent } from './vender/vender-new/vender-new.component';
import { VenueEditComponent } from './venue/venue-edit/venue-edit.component';
import { VenueNewComponent } from './venue/venue-new/venue-new.component';
import { VenueShowComponent } from './venue/venue-show/venue-show.component';
import { AmenityShowComponent } from './amenity/amenity-show/amenity-show.component';
import { AmenityEditComponent } from './amenity/amenity-edit/amenity-edit.component';
import { VenderShowComponent } from './vender/vender-show/vender-show.component';
import { VenueService } from '../services/venue.service';
import { MessageService } from '../services/messages.service';

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
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReviewShowComponent } from './review/review-show/review-show.component';
import { ReviewEditComponent } from './review/review-edit/review-edit.component';
import { ReviewNewComponent } from './review/review-new/review-new.component';
import { ReviewService } from '../services/review.service';
import { CategoryShowComponent } from './category/category-show/category-show.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { SortVenuesPipe } from '../pipes/sort-venues.pipe';
import { FilterVenuesPipe } from '../pipes/filter-venues.pipe';


@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
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
  ],
  declarations: [
    AdminComponent,
    AdminNavComponent,
    DashboardComponent,
    AmenityShowComponent,
    AmenityEditComponent,
    RegisterComponent,
    VenderShowComponent,
    VenderEditComponent,
    VenderNewComponent,
    VenueEditComponent,
    VenueNewComponent,
    VenueShowComponent,
    ReviewShowComponent,
    ReviewEditComponent,
    ReviewNewComponent,
    CategoryShowComponent,
    CategoryEditComponent,
    SortVenuesPipe,
    FilterVenuesPipe,
  ],
  providers: [
    AmenityService,
    CategoryService,
    MessageService,
    ReviewService,
    VenderService,
    VenueService,
    UserService
  ],
})
export class AdminModule { }