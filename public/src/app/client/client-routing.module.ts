import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { SearchComponent } from './search/search.component';
import { VenueComponent } from './venue/venue.component';
import { VenderComponent } from './vender/vender.component';
import { Rights } from '../structure/footer/rights/rights.component';
import { LandingComponent } from './landing/landing.component';
import { DigitalTourComponent } from './venue/digital-tour/digital-tour.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LandingComponent
      },
      {
        path: 'search',
        pathMatch: 'full',
        component: SearchComponent
      },
      { 
        path: 'venue/display/:id', 
        pathMatch: 'full', 
        component: VenueComponent 
      },
      { 
        path: 'venue/display/:id/3d', 
        pathMatch: 'full', 
        component: DigitalTourComponent 
      },
      { 
        path: 'vender/display/:id', 
        pathMatch: 'full', 
        component: VenderComponent 
      },
      { 
        path: 'rights', 
        pathMatch: 'full', 
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
