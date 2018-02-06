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
    FilterVenuesPipe
  ],
})
export class ClientModule { }
