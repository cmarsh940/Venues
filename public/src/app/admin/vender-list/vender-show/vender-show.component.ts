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
  current_user: User;
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
      this._router.navigateByUrl('/');
    }
  }


  getVenders() {
    this._venderService.get_all_venders()
      .then(data => {
        this.venders = data;
      })
      .catch((err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log("An error occurred:", err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(
            `Backend returned code ${err.status}, body was: ${err.error}`
          );
        }
      });
  }

  // getVenders(): void {
  //   this._venderService.get_venders().subscribe(venders => (this.venders = venders));
  // }

  delete(vender) {
    this._venderService.destroy_vender(vender)
      .then(() => {
        this.getVenders();
      })
      .catch((err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log("An error occurred:", err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(
            `Backend returned code ${err.status}, body was: ${err.error}`
          );
        }
      });
  }

}
