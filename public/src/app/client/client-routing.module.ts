import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { SearchComponent } from './search/search.component';
import { VenueComponent } from './venue/venue.component';
import { Rights } from '../structure/footer/rights/rights.component';
import { LandingComponent } from './landing/landing.component';
import { ReviewNewComponent } from './venue/review-new/review-new.component';
import { BallroomComponent } from './search/category/ballroom/ballroom.component';
import { BarnComponent } from './search/category/barn/barn.component';
import { ChapelComponent } from './search/category/chapel/chapel.component';
import { CountryClubComponent } from './search/category/country-club/country-club.component';
import { EventCenterComponent } from './search/category/event-center/event-center.component';
import { HistoricComponent } from './search/category/historic/historic.component';
import { LodgeComponent } from './search/category/lodge/lodge.component';
import { VendorComponent } from './vendor/vendor.component';
import { VendorDisplayComponent } from './vendor/vendor-display/vendor-display.component';
import { MansionsComponent } from './search/category/Mansions/mansions.component';

const routes: Routes = [
  {
    path: "",
    component: ClientComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        component: LandingComponent
      },
      {
        path: "search",
        pathMatch: "full",
        component: SearchComponent
      },
      {
        path: "search/ballroom",
        pathMatch: "full",
        component: BallroomComponent
      },
      {
        path: "search/barn",
        pathMatch: "full",
        component: BarnComponent
      },
      {
        path: "search/chapel",
        pathMatch: "full",
        component: ChapelComponent
      },
      {
        path: "search/countryclub",
        pathMatch: "full",
        component: CountryClubComponent
      },
      {
        path: "search/eventcenter",
        pathMatch: "full",
        component: EventCenterComponent
      },
      {
        path: "search/mansions",
        pathMatch: "full",
        component: MansionsComponent
      },
      {
        path: "search/lodge",
        pathMatch: "full",
        component: LodgeComponent
      },
      {
        path: "vendor",
        pathMatch: "full",
        component: VendorComponent
      },
      {
        path: "vendor/display/:id",
        pathMatch: "full",
        component: VendorDisplayComponent
      },
      {
        path: "venue/display/:id",
        pathMatch: "full",
        component: VenueComponent
      },
      {
        path: "venue/:id/review",
        pathMatch: "full",
        component: ReviewNewComponent
      },
      {
        path: "rights",
        pathMatch: "full",
        component: Rights
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
