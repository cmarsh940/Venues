import { UserService } from './../../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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
  

  @ViewChild('file') file_input;
  @ViewChild('form') my_form;
  @Output() newVender_event = new EventEmitter();

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

  // createVender() {
  //   this.errors = [];
  //   return this._venderService.createVender(this.newVender, (vender) => {
  //     console.log(vender);
  //     if (vender.errors) {
  //       for (let key in vender.errors) {
  //         let errors = vender.errors[key];
  //         this.errors.push(errors.message);
  //       }
  //     } else {
  //       this.getVenders();
  //       this._router.navigate(['/list_vender']);
  //     }
  //   })
  // }

  createVender() {
    this.errors = [];
    if (this._userService.getCurrentUser() == null) {
      console.log("REPORTED: You do not have administration privilages")
      this._router.navigateByUrl('/');
    } else {
      let form_data = new FormData(this.my_form.nativeElement);
      console.log("*** This is the form data", form_data);
      this._venderService.post_to_s3(form_data, res => {
        console.log("*** Setting new venue");
        this.newVender = new Vender();
        console.log("*** Setting file value");
        this.file_input.nativeElement.value = "";
        console.log("*** About to emit");
        this.newVender_event.emit();
        this._router.navigate(['/list_vender']);
      });
    }
  }
}
