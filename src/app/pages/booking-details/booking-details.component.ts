import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BookingResponse, BookDetails } from 'src/app/models/bookRequest';
import { Meals } from 'src/app/models/enums/enums';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
})
export class BookingDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  id: string = '';
  details: BookDetails[] = [];
  booking: BookingResponse = {
    airlineName: '',
    flightNumber: '',
    fromPlace: '',
    id: '',
    price: 0,
    toPlace: '',
    userId: '',
    date: new Date(),
    bookingDetails: this.details,
    email: '',
    flightId: '',
    meals: Meals.None,
    name: '',
    noOfSeats: 0,
    logoPath: '',
  };
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') || '';
      this.bookingService.getBookingDetails(this.id).subscribe((data) => {
        this.booking = data;
      });
    });
  }
}
