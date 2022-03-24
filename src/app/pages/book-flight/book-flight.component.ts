import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DiscountCouponModel } from 'src/app/models/discount-coupon.model';
import { FlightModel } from 'src/app/models/flightModel';
import { AirlineService } from 'src/app/services/airline.service';
import { BookingService } from 'src/app/services/booking.service';
import { DiscountCouponService } from 'src/app/services/discount-coupon.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
})
export class BookFlightComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private bookService: BookingService,
    private messageService: MessageService,
    private airlineService: AirlineService,
    private discountService: DiscountCouponService
  ) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    if (!this.state) {
      let state = localStorage.getItem('search-param');
      if (state) {
        this.state = JSON.parse(state);
      } else router.navigate(['/user/search']);
    } else {
      localStorage.setItem('search-param', JSON.stringify(this.state));
    }
  }

  discountModel: DiscountCouponModel | null = null;

  state: any;

  bookingId = '';
  code = '';

  applyCoupon = () => {
    this.discountService.getCouponByCode(this.code).subscribe({
      next: (data) => (this.discountModel = data),
      error: (e) => {
        this.messageService.handleError(e);
        this.discountModel = null;
      },
    });
  };

  removeCoupon = () => {
    this.discountModel = null;
    this.code = '';
  };

  getPrice = () => {
    return (
      (this.outBoundFlight.price + (this.returnFlight?.price || 0)) *
      this.bookForm.value.bookingDetails.length
    );
  };

  getDiscountAmount = () => {
    return (this.getPrice() * (this.discountModel?.discountPercent || 0)) / 100;
  };

  getFinalAmount = () => {
    return this.getPrice() - this.getDiscountAmount();
  };

  bookForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    meals: 'None',
    returnMeals: 'None',
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
  submitting = false;

  outBoundFlight: FlightModel = {
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

  returnFlight: FlightModel = {
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
    this.airlineService
      .getFlight(this.state.outboundFlightId)
      .subscribe((data) => {
        this.outBoundFlight = data;
      });

    if (this.state.flightType === 'Roundtrip') {
      this.airlineService
        .getFlight(this.state.returnFlightId)
        .subscribe((data) => {
          this.returnFlight = data;
        });
    }
  }
  onSubmit = () => {
    this.submitted = true;
    this.submitting = true;
    if (this.bookForm.valid) {
      let data = this.bookForm.value;
      data.outBoundFlightId = this.state.outboundFlightId;
      data.returnFlightId = this.state.returnFlightId;
      data.noOfSeats = data.bookingDetails.length;
      data.flightType = this.state.flightType;
      data.date = this.state.date;
      data.returnDate = this.state.returnDate;
      data.couponCode = this.discountModel?.couponCode;
      this.bookService.bookFlight(data).subscribe({
        next: (data) => {
          this.bookingId = data.id;
          this.submitting = false;
          localStorage.removeItem('search-param');
        },
        error: (e) => {
          this.submitting = false;
          this.messageService.handleError(e);
        },
      });
    }
  };
}
