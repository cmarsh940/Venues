import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Vender } from '../../../models/vender';
import { VenderService } from '../../../services/vender.service';

@Component({
  selector: 'app-vender-show',
  templateUrl: './vender-show.component.html',
  styleUrls: ['./vender-show.component.css']
})
export class VenderShowComponent implements OnInit {
  venders: Array<Vender>;
  currentUser: User;
  search_text: String = '';

  constructor(
    private _venderService: VenderService,
    private _userService: UserService,
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

  destroyVender(id: string, idx: any) {
    let r = window.confirm("Delete Vender?");
    if (r == true) {
      this._venderService.destroy(id, res => this.venders.splice(idx, 1));
    } else {
      window.close();
    }
  }

}
