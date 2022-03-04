import { Component, OnInit } from '@angular/core';
import { AirlineModel } from 'src/app/models/airlineModel';
import { AirlineService } from 'src/app/services/airline.service';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
})
export class AirlinesComponent implements OnInit {
  airlines: AirlineModel[] = [];
  constructor(private airlineService: AirlineService) {}

  ngOnInit(): void {
    this.airlineService
      .getAirlines(false)
      .subscribe((data) => (this.airlines = data));
  }
}
