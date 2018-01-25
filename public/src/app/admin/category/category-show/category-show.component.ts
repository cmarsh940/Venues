import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-show',
  templateUrl: './category-show.component.html',
  styleUrls: ['./category-show.component.css']
})
export class CategoryShowComponent implements OnInit {
  currentUser: User;
  categories: Category[];
  newCategory: Category = new Category();
  errors: string[] = [];

  constructor(
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn();
    this.getCategories();
  }

  isLoggedIn() {
    if (this._userService.getCurrentUser() == null) {
      console.log("You are not logged in with admin privlages", sessionStorage)
      this._router.navigateByUrl('/dashboard');
    }
  }

  validateSession(): void {
    if (!this.currentUser) {
      this._router.navigateByUrl('/');
    }
  }

  getCategories(): void {
    this._categoryService.getCategories((categories) => this.categories = categories);
  }

  createCategory() {
    this.errors = [];
    return this._categoryService.createCategory(this.newCategory, (category) => {
      console.log(category);
      if (category.errors) {
        for (let key in category.errors) {
          let error = category.error[key];
          this.errors.push(error.message);
        }
      } else {
        this.getCategories();
        this._router.navigate(['/list_category']);
      }
    })
  }

  destroyCategory(id: string, idx: any) {
    this._categoryService.destroy(id, res => this.categories.splice(idx, 1));
  }

}
