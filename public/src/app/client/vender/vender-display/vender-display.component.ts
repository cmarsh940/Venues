import { Subscription } from 'rxjs/Subscription';
import { Vender } from './../../../models/vender';
import { VenderService } from './../../../services/vender.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: "app-vender-display",
  templateUrl: "./vender-display.component.html",
  styleUrls: ["./vender-display.component.css"],
  preserveWhitespaces: false
})
export class VenderDisplayComponent implements OnInit {
  vender = new Vender();
  subscription: Subscription;
  loaded: Boolean = false;

  constructor(
    private _venderService: VenderService,
    private _activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.loaded = false;
    this.getVender();
    setTimeout(() => {
      this.loaded = true;
    }, 1000);
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
