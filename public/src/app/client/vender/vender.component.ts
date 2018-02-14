import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { Vender } from '../../models/vender';
import { VenderService } from '../../services/vender.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: "app-vender",
  templateUrl: "./vender.component.html",
  styleUrls: ["./vender.component.css"],
  preserveWhitespaces: false
})
export class VenderComponent implements OnInit {
  vender = new Vender();
  subscription: Subscription;

  constructor(
    private _venderService: VenderService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.getVender();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getVender() {
    this.subscription = this._activatedRoute.params.subscribe(params =>
      this._venderService.showVender(params.id, res => (this.vender = res))
    );
  }

  goBack(): void {
    this.location.back();
  }
}
