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
import { ReviewShowComponent } from './review/review-show/review-show.component';
import { ReviewNewComponent } from './review/review-new/review-new.component';
import { ReviewEditComponent } from './review/review-edit/review-edit.component';
import { CategoryShowComponent } from './category/category-show/category-show.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { UploadComponent } from "./venue/upload/upload.component";

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
        component: AmenityEditComponent 
      },
      {
        path: 'list_category',
        pathMatch: 'full',
        component: CategoryShowComponent
      },
      {
        path: 'category/edit/:id',
        pathMatch: 'full',
        component: CategoryEditComponent 
      },
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
        path: 'venue/upload/:id', 
        pathMatch: 'full', 
        component: UploadComponent
      },
      {
        path: 'list_review',
        pathMatch: 'full',
        component: ReviewShowComponent
      },
      { 
        path: 'review/add', 
        pathMatch: 'full', 
        component: ReviewNewComponent 
      },
      { 
        path: 'review/edit/:id', 
        pathMatch: 'full', 
        component: ReviewEditComponent 
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
