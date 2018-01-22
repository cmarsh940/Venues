import { RegisterComponent } from './auth/register/register.component';
import { VenueComponent } from './client/venue/venue.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { DashboardComponent } from './client/dashboard/dashboard.component';
import { VenueSearchComponent } from './client/venue-search/venue-search.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { VenueShowComponent } from './admin/venue-list/venue-show/venue-show.component';
import { VenueNewComponent } from './admin/venue-list/venue-new/venue-new.component';
import { VenueEditComponent } from './admin/venue-list/venue-edit/venue-edit.component';
import { AmmenityShowComponent } from './admin/ammenity-list/ammenity-show/ammenity-show.component';
import { AmmenityEditComponent } from './admin/ammenity-list/ammenity-edit/ammenity-edit.component';
import { Rights } from './structure/footer/rights/rights.component';
import { VenderShowComponent } from './admin/vender-list/vender-show/vender-show.component';
import { VenderNewComponent } from './admin/vender-list/vender-new/vender-new.component';
import { VenderEditComponent } from './admin/vender-list/vender-edit/vender-edit.component';
import { VenderComponent } from './client/vender/vender.component';

const routes: Routes = [
  {
    path: '', component: ClientComponent,
    children: [
      { path: '', pathMatch: 'full', component: DashboardComponent },
      { path: 'search', pathMatch: 'full', component: VenueSearchComponent },
      { path: 'venue/display/:id', pathMatch: 'full', component: VenueComponent },
      { path: 'vender/display/:id', pathMatch: 'full', component: VenderComponent },
      { path: 'rights', pathMatch: 'full', component: Rights }
    ]
  },
  { path: 'admin', pathMatch: 'full', component: LoginComponent },
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'dashboard', pathMatch: 'full', component: AdminDashboardComponent },
      { path: 'list_venue', pathMatch: 'full', component: VenueShowComponent },
      { path: 'venue/add', pathMatch: 'full', component: VenueNewComponent },
      { path: 'venue/edit/:id', pathMatch: 'full', component: VenueEditComponent },
      { path: 'list_vender', pathMatch: 'full', component: VenderShowComponent },
      { path: 'vender/add', pathMatch: 'full', component: VenderNewComponent },
      { path: 'vender/edit/:id', pathMatch: 'full', component: VenderEditComponent },
      { path: 'list_ammenity', pathMatch: 'full', component: AmmenityShowComponent },
      { path: 'ammenity/edit/:id', pathMatch: 'full', component: AmmenityEditComponent },
      { path: 'list_admin', pathMatch: 'full', component: RegisterComponent }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
