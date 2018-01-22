import { Router } from '@angular/router';
import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Vender } from '../../../models/vender';
import { VenderService } from '../../../services/vender.service';

@Component({
  selector: 'app-vender-new',
  templateUrl: './vender-new.component.html',
  styleUrls: ['./vender-new.component.css']
})
export class VenderNewComponent implements OnInit {
  new_vender: Vender = new Vender();
  current_user: User;
  errors = [];

  @ViewChild('file') file_input;
  @ViewChild('form') my_form;
  @Output() new_vender_event = new EventEmitter();

  constructor(
    private _venderService: VenderService,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    if (this._userService.getCurrentUser() == null) {
      this._router.navigateByUrl('/');
    }
  }

  create_vender() {
    let form_data = new FormData(this.my_form.nativeElement);

    console.log("*** This is the form data", form_data);
    this._venderService.post_vender(form_data).then(() => {
      console.log("*** Setting new vender");
      this.new_vender = new Vender();
      console.log("*** Setting file value");
      this.file_input.nativeElement.value = "";
      console.log("*** About to emit");
      this.new_vender_event.emit();
      this._router.navigate(['/list_vender']);
    });
  }

}
