import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AmmenityService } from '../../../services/ammenity.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { Ammenity } from '../../../models/ammenity';

@Component({
  selector: 'app-ammenity-new',
  templateUrl: './ammenity-new.component.html',
  styleUrls: ['./ammenity-new.component.css']
})
export class AmmenityNewComponent implements OnInit {
  new_ammenity: Ammenity = new Ammenity();
  current_user: User;
  errors: string[] = [];

  @ViewChild('form') my_form;
  @Output() new_ammenity_event = new EventEmitter();

  constructor(
    private _ammenityService: AmmenityService,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    if (this._userService.getCurrentUser() == null) {
      this._router.navigateByUrl('/');
    }
  }

  // create_ammenity(): void {
  //   const form_data = new FormData(this.my_form.nativeElement);
  //   console.log("*** This is the form data", form_data);
  //   this._ammenityService.post_ammenity(form_data).then(() => {
  //     console.log("*** Setting new ammenity");
  //     this.new_ammenity = new Ammenity();
  //     console.log("*** About to emit");
  //     this.new_ammenity_event.emit();
  //     this._router.navigate(['/list_ammenity']);
  //   });
  // }
}
