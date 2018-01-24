import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { AmenityShowComponent } from './amenity/amenity-show/amenity-show.component';
import { VenderShowComponent } from './vender/vender-show/vender-show.component';
import { VenueShowComponent } from './venue/venue-show/venue-show.component';
import { AmenityEditComponent } from './amenity/amenity-edit/amenity-edit.component';
import { RegisterComponent } from '../auth/register/register.component';
import { VenueNewComponent } from './venue/venue-new/venue-new.component';
import { VenueEditComponent } from './venue/venue-edit/venue-edit.component';
import { VenderNewComponent } from './vender/vender-new/vender-new.component';
import { VenderEditComponent } from './vender/vender-edit/vender-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'admin_dashboard',
        pathMatch: 'full',
        component: DashboardComponent
      },
      {
        path: 'list_amenity',
        pathMatch: 'full',
        component: AmenityShowComponent
      },
      {
        path: 'amenity/edit/:id',
        pathMatch: 'full',
        component: AmenityEditComponent },
      {
        path: 'list_vender',
        pathMatch: 'full',
        component: VenderShowComponent
      },
      {
        path: 'list_venue',
        pathMatch: 'full',
        component: VenueShowComponent
      },
      { 
        path: 'venue/add', 
        pathMatch: 'full', 
        component: VenueNewComponent 
      },
      { 
        path: 'venue/edit/:id', 
        pathMatch: 'full', 
        component: VenueEditComponent 
      },
      
      { 
        path: 'vender/add', 
        pathMatch: 'full', 
        component: VenderNewComponent
      },
      { 
        path: 'vender/edit/:id', 
        pathMatch: 'full', 
        component: VenderEditComponent 
      },
      { 
        path: 'list_admin', 
        pathMatch: 'full', 
        component: RegisterComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
