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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../environments/environment';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { DigitalTourComponent } from './venue/digital-tour/digital-tour.component';
import { DigitalTourService } from '../services/digital-tour.service';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    HttpModule,
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
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    }),
    AgmSnazzyInfoWindowModule
  ],
  declarations: [
    ClientComponent,
    DigitalTourComponent,
    FooterComponent,
    LandingComponent,
    NavComponent,
    Rights,
    SearchComponent, 
    VenderComponent, 
    VenueComponent, 
    DigitalTourComponent 
  ],
  providers: [
    DigitalTourService
  ],
})
export class ClientModule { }
