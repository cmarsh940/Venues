import { Subscription } from 'rxjs/Subscription';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Vender } from '../../../models/vender';
import { VenderService } from '../../../services/vender.service';

@Component({
  selector: 'app-vender-edit',
  templateUrl: './vender-edit.component.html',
  styleUrls: ['./vender-edit.component.css']
})
export class VenderEditComponent implements OnInit, OnDestroy {
  vender = new Vender();
  currentUser: User;
  subscription: Subscription;

  constructor(
    private _venderService: VenderService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn();
    this.getVenders();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  getVenders() {
    this.subscription = this._activatedRoute.params.subscribe(
      params => this._venderService.showVender(params.id, res => this.vender = res)
    );
  }

  updateVender() {
    this._venderService.updateVender(this.vender, res => {
      this._router.navigate(['/list_vender']);
    });
  }
}
