import { LoginComponent } from './login/login.component';
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

const routes: Routes = [
  {
    path: '', component: ClientComponent,
    children: [
      { path: '', pathMatch: 'full', component: DashboardComponent },
      { path: 'search', pathMatch: 'full', component: VenueSearchComponent },
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
