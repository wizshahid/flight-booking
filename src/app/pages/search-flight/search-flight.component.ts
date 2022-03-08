import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Airport } from 'src/app/models/airport';
import { FlightModel } from 'src/app/models/flightModel';
import { AirlineService } from 'src/app/services/airline.service';
import { AirportService } from 'src/app/services/airport.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
})
export class SearchFlightComponent implements OnInit {
  searchForm = this.formBuilder.group({
    toPlace: '',
    fromPlace: '',
    date: new Date(),
  });

  flights: FlightModel[] = [];
  airports: Airport[] = [];

  constructor(
    private airlineService: AirlineService,
    private formBuilder: FormBuilder,
    private airportService: AirportService
  ) {}

  ngOnInit(): void {
    this.airportService
      .getAirports()
      .subscribe((data) => (this.airports = data));
    this.onSubmit();
  }

  onSubmit() {
    this.airlineService.searchFlight(this.searchForm.value).subscribe({
      next: (data) => {
        this.flights = data;
      },
      error: (err) => alert(err.error),
    });
  }
}
