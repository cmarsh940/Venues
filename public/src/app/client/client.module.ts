import { MaterialModule } from './../material/material.module';
import { NavComponent } from './../structure/nav/nav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientComponent } from './client.component'
import { ClientRoutingModule } from './client-routing.module';
import { SearchComponent } from './search/search.component';
import { VenderComponent } from './vender/vender.component';
import { VenueComponent } from './venue/venue.component';
import { LandingComponent } from './landing/landing.component';
import { Rights } from '../structure/footer/rights/rights.component';
import { FooterComponent } from '../structure/footer/footer.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../environments/environment';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';


import { FilterVenuesPipe } from '../pipes/filter-venues.pipe';
import { ReviewNewComponent } from './venue/review-new/review-new.component';
import { BarnComponent } from './search/category/barn/barn.component';
import { BallroomComponent } from './search/category/ballroom/ballroom.component';
import { ChapelComponent } from './search/category/chapel/chapel.component';
import { CountryClubComponent } from './search/category/country-club/country-club.component';
import { EventCenterComponent } from './search/category/event-center/event-center.component';
import { GardenComponent } from './search/category/garden/garden.component';
import { HistoricComponent } from './search/category/historic/historic.component';
import { LodgeComponent } from './search/category/lodge/lodge.component';
import { VenderDisplayComponent } from './vender/vender-display/vender-display.component';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    }),
    AgmSnazzyInfoWindowModule,
  ],
  declarations: [
    ClientComponent,
    FooterComponent,
    LandingComponent,
    NavComponent,
    Rights,
    SearchComponent, 
    VenderComponent, 
    VenueComponent,
    ReviewNewComponent,
    FilterVenuesPipe,
    BarnComponent,
    BallroomComponent,
    ChapelComponent,
    CountryClubComponent,
    EventCenterComponent,
    GardenComponent,
    HistoricComponent,
    LodgeComponent,
    VenderDisplayComponent
  ],
})
export class ClientModule { }
