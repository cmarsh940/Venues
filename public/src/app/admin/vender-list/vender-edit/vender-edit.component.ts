import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Vender } from '../../../models/vender';
import { VenderService } from '../../../services/vender.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vender-edit',
  templateUrl: './vender-edit.component.html',
  styleUrls: ['./vender-edit.component.css']
})
export class VenderEditComponent implements OnInit {
  vender = new Vender();
  current_user: User;
  vender_list: Array<Vender>;
  // venders: Vender[];


  // @Input() vender: Vender;

  constructor(
    private _route: ActivatedRoute,
    private _venderService: VenderService,
    private _userService: UserService,
    private _router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.isLoggedIn();
    this.getVenders();
    this.getRouteParams();
  }

  isLoggedIn() {
    if (this._userService.getCurrentUser() == null) {
      this._router.navigateByUrl('/');
    }
  }

  // getVender(): void {
  //   const id = +this._route.snapshot.paramMap.get("id");
  //   this._venderService.get_one(id).subscribe(vender => (this.vender = vender));
  // }

  getVenders() {
    this._venderService
      .get_all_venders()
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
