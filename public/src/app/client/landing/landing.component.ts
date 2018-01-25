import { VenderService } from './../../services/vender.service';
import { Component, OnInit } from '@angular/core';
import { Vender } from '../../models/vender';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  venders: Array<Vender>;
  
  constructor(
    private _venderService: VenderService,
  ) { }

  ngOnInit() {
    this.getVenders();
  }

  getVenders(): void {
    this._venderService.getVenders((venders) => this.venders = venders.slice(0, 4));
  }

}
