import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FlightModel } from 'src/app/models/flightModel';
import { AirlineService } from 'src/app/services/airline.service';
import { BookingService } from 'src/app/services/booking.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
})
export class BookFlightComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private airlineService: AirlineService,
    private formBuilder: FormBuilder,
    private router: Router,
    private bookService: BookingService,
    private messageService: MessageService
  ) {}

  id = '';
  bookingId = '';

  bookForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    flightId: this.id,
    noOfSeats: '',
    meals: 'None',
    date: new Date(),
    bookingDetails: this.formBuilder.array([
      this.formBuilder.group({
        name: new FormControl('', Validators.required),
        gender: 'Male',
        age: 1,
        seatNumber: 1,
      }),
    ]),
  });

  submitted = false;

  flight: FlightModel = {
    airlineName: '',
    date: new Date(),
    flightNumber: '',
    fromPlace: '',
    inventoryId: '',
    logoPath: '',
    price: 0,
    toPlace: '',
    flightType: '',
  };

  get details() {
    return this.bookForm.controls['bookingDetails'] as FormArray;
  }

  asFormGroup = (abs: AbstractControl) => {
    return abs as FormGroup;
  };

  addDetail = () => {
    const formControl = this.formBuilder.group({
      name: '',
      gender: 'Male',
      age: 1,
      seatNumber: 1,
    });
    this.details.push(formControl);
  };

  removeDetail = (index: number) => {
    if (this.details.length == 1) {
      alert('Atleast one seat needs to be booked');
    } else {
      this.details.removeAt(index);
    }
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') || '';
      this.airlineService.getFlight(this.id).subscribe((data) => {
        this.flight = data;
      });
    });
  }
  onSubmit = () => {
    this.submitted = true;
    if (this.bookForm.valid) {
      let data = this.bookForm.value;
      data.flightId = this.id;
      data.noOfSeats = data.bookingDetails.length;
      this.bookService.bookFlight(data).subscribe({
        next: (data) => (this.bookingId = data.id),
        error: this.messageService.handleError,
      });
    }
  };
}
