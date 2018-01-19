import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser: User = new User();
  currentUser: User = new User();
  errors: any = [];
  users: Array<User>;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn();
    this.getUsers();
  }

  isLoggedIn() {
    if (this._userService.getCurrentUser() == null) {
      console.log("You are not logged in with admin privlages", sessionStorage)
      this._router.navigateByUrl('/dashboard');
    }
  }

  createUser() {
    this.errors = [];
    return this._userService.createUser(this.newUser)
      .then(user => {
        console.log(user);
        if (user.errors) {
          for (let key in user.errors) {
            let error = user.error[key];
            this.errors.push(error.message);
          }
        } else {
          this._userService.setCurrentUser(user);
          this._router.navigateByUrl('/dashboard');
        }
      })
      .catch(err => console.log(err));
  }

  getUsers(): void {
    this._userService.get_all_users()
      .subscribe(users => (this.users = users));
  }

}
