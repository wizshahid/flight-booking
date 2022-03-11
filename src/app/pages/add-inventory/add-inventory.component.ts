import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
    airlineId: new FormControl('', Validators.required),
    flightNumber: new FormControl('', Validators.required),
    fromPlaceId: new FormControl('', Validators.required),
    toPlaceId: new FormControl('', Validators.required),
    startDate: new FormControl(new Date(), Validators.required),
    endDate: new FormControl(new Date(), Validators.required),
    scheduledDays: new FormControl(ScheduledDays.Daily, Validators.required),
    instrumentUsed: new FormControl('', Validators.required),
    businessClassSeats: new FormControl(0, Validators.min(1)),
    nonBusinessClassSeats: new FormControl(0, Validators.min(1)),
    ticketPrice: new FormControl(0, Validators.min(1)),
    numberOfRows: new FormControl(0, Validators.min(1)),
    meals: new FormControl(Meals.None, Validators.required),
    flightType: new FormControl('Oneway', Validators.required),
  });

  submitted = false;
  ngOnInit(): void {
    this.airlineService
      .getAirlines(true)
      .subscribe((data) => (this.airlines = data));

    this.airportService
      .getAirports()
      .subscribe((data) => (this.airports = data));
  }

  onSubmit = () => {
    this.submitted = true;
    if (this.inventoryForm.valid)
      this.airlineService.addInventory(this.inventoryForm.value).subscribe({
        next: (data) => {
          this.router.navigate(['/admin/airlines', data.airlineId]);
        },
        error: this.messageService.handleError,
      });
  };
}
