import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AirlineModel } from 'src/app/models/airlineModel';
import { Airport } from 'src/app/models/airport';
import { Meals, ScheduledDays } from 'src/app/models/enums/enums';
import { AirlineService } from 'src/app/services/airline.service';
import { AirportService } from 'src/app/services/airport.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
})
export class AddInventoryComponent implements OnInit {
  airlines: AirlineModel[] = [];
  airports: Airport[] = [];
  constructor(
    private airportService: AirportService,
    private airlineService: AirlineService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {}

  inventoryForm = this.formBuilder.group({
    airlineId: '',
    flightNumber: '',
    fromPlaceId: '',
    toPlaceId: '',
    startDate: new Date(),
    endDate: new Date(),
    scheduledDays: ScheduledDays.Daily,
    instrumentUsed: '',
    businessClassSeats: 0,
    nonBusinessClassSeats: 0,
    ticketPrice: 0,
    numberOfRows: 0,
    meals: Meals.None,
    flightType: 'Oneway',
  });

  ngOnInit(): void {
    this.airlineService
      .getAirlines(true)
      .subscribe((data) => (this.airlines = data));

    this.airportService
      .getAirports()
      .subscribe((data) => (this.airports = data));
  }

  onSubmit = () => {
    this.airlineService.addInventory(this.inventoryForm.value).subscribe({
      next: (data) => {
        this.router.navigate(['/admin/airlines', data.airlineId]);
      },
      error: this.messageService.handleError,
    });
  };
}
