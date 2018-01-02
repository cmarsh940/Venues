import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: ClientComponent,
    children: [
    ]
  },
  { path: 'admin', pathMatch: 'full', component: LoginComponent },
  {
    path: 'dashboard', component: AdminComponent,
    children: [
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
