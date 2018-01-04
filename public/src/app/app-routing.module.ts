import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './client/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: ClientComponent,
    children: [
      { path: '', pathMatch: 'full', component: DashboardComponent },
    ]
  },
  { path: 'admin', pathMatch: 'full', component: LoginComponent },
  {
    path: 'dashboard', component: AdminComponent,
    children: [
      { path: 'dashboard', pathMatch: 'full', component: AdminDashboardComponent },
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
