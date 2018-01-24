import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  currentUser: User = new User();
  newUser: User = new User();
  users: Array<User> = []
  errors: string[] = [];
  

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn();
    this.validateSession();
    this.getUsers();
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

  getUsers(): void {
    this._userService.getUsers((users) => this.users = users);
  }
      
  createUser() {
    this.errors = [];
    return this._userService.createUser(this.newUser, (user) => {
        console.log(user);
        if (user.errors) {
          for (let key in user.errors) {
            let error = user.error[key];
            this.errors.push(error.message);
          }
        } else {
          this._userService.setCurrentUser(user);
          this.getUsers();
          this._router.navigate(['/list_admin']);
        }
      })
  }
  
  destroyUser(id: string, idx: any) {
    this._userService.destroy(id, res => this.users.splice(idx, 1));
  }

}
