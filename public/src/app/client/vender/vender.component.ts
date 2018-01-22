import { Router, ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Vender } from '../../models/vender';
import { VenderService } from '../../services/vender.service';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.css']
})
export class VenderComponent implements OnInit {
  vender = new Vender();
  vender_list: Array<Vender>;

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private _route: ActivatedRoute,
    private _venderService: VenderService,
    private _router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.getVenders();
    this.getRouteParams();
  }

  getVenders() {
    this._venderService.get_all_venders()
      .then(data => {
        this.vender_list = data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  // getVenders(): void {
  //   this._venderService.get_venders().subscribe(venders => (this.venders = venders));
  // }

  getRouteParams() {
    this._route.params.subscribe(param => {
      console.log("request to get one vender from client");
      console.log(param.id);
      this._venderService
        .get_one(param.id)
        .then(data => {
          this.vender = data;
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  update(vender) {
    this._venderService.update_vender(this.vender);
    this._router.navigate(['/list_vender']);
  }

  goBack(): void {
    this.location.back();
  }

}
