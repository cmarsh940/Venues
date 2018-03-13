import { VendorCategoryEditComponent } from './vendor-category/vendor-category-edit/vendor-category-edit.component';
import { VendorCategoryShowComponent } from './vendor-category/vendor-category-show/vendor-category-show.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../material/material.module';
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

import { ReviewShowComponent } from './review/review-show/review-show.component';
import { ReviewEditComponent } from './review/review-edit/review-edit.component';
import { ReviewNewComponent } from './review/review-new/review-new.component';
import { ReviewService } from '../services/review.service';
import { CategoryShowComponent } from './category/category-show/category-show.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { SortVenuesPipe } from '../pipes/sort-venues.pipe';
import { UploadComponent } from './venue/upload/upload.component';

import { VendorCategoryService } from '../services/vendor-category.service';


@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
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
    VendorCategoryEditComponent,
    VendorCategoryShowComponent,
    SortVenuesPipe,
    UploadComponent
  ],
  providers: [
    AmenityService,
    CategoryService,
    VendorCategoryService,
    MessageService,
    ReviewService,
    VenderService,
    VenueService,
    UserService
  ]
})
export class AdminModule {}
