import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentUser: User = new User();
  newUser: User = new User();
  errors: any = [];
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.currentUser.email = 'test@test.test';
    this.currentUser.password = 'Marshal1';
    this.loginUser();
  }

  loginUser() {
    this.errors = [];
    this._userService.authenticate(this.currentUser, (user) => {
      console.log(user);

      if (user.errors) {
        for (const key of Object.keys(user.errors)) {
          const error = user.errors[key];
          this.errors.push(error.message);
        }
      } else {
        this._userService.setCurrentUser(user);
        this._router.navigateByUrl('/dashboard');
      }
    });
  }
  createUser() {
    this.errors = [];
    return this._userService.createUser(this.newUser)
      .then(user => {
        console.log(user);
        if (user.errors) {
          for (const key in user.errors) {
            const error = user.error[key];
            this.errors.push(error.message);
          }
        } else {
          this._userService.setCurrentUser(user);
          this._router.navigateByUrl('/dashboard');
        }
      })
      .catch(err => console.log(err));
  }
}
