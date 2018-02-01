import { UserService } from './../../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Vender } from '../../../models/vender';
import { VenderService } from '../../../services/vender.service';


@Component({
  selector: 'app-vender-new',
  templateUrl: './vender-new.component.html',
  styleUrls: ['./vender-new.component.css']
})
export class VenderNewComponent implements OnInit {
  currentUser: User;
  venders: Vender[];
  newVender: Vender = new Vender();
  errors: string[] = [];
  
  constructor(
    private _userService: UserService,
    private _venderService: VenderService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn();
    this.getVenders();
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
  getVenders(): void {
    this._venderService.getVenders((venders) => this.venders = venders);
  }

  createVender() {
    this.errors = [];
    return this._venderService.createVender(this.newVender, (vender) => {
      console.log(vender);
      if (vender.errors) {
        for (let key in vender.errors) {
          let errors = vender.errors[key];
          this.errors.push(errors.message);
        }
      } else {
        this.getVenders();
        this._router.navigate(['/list_vender']);
      }
    })
  }
}
