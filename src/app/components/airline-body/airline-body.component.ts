import { Component, Input, OnInit } from '@angular/core';
import { FlightModel } from 'src/app/models/flightModel';

@Component({
  selector: 'app-airline-body',
  templateUrl: './airline-body.component.html',
  styleUrls: ['./airline-body.component.css'],
})
export class AirlineBodyComponent implements OnInit {
  @Input()
  flight: FlightModel | null = null;

  @Input()
  selected: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
