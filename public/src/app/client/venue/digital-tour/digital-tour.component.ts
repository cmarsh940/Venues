import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-digital-tour',
  templateUrl: './digital-tour.component.html',
  styleUrls: ['./digital-tour.component.css']
})
export class DigitalTourComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
}