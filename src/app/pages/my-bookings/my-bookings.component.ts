import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { BookingResponse } from 'src/app/models/bookRequest';

@Component({
  templateUrl: './my-bookings.component.html',
  selector: 'app-my-bookings',
})
export class MyBookingsComponent implements OnInit {
  bookings: BookingResponse[] = [];
  email = '';
  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.onSearch();
  }

  onSearch = () => {
    this.bookingService
      .getMyBookings(this.email)
      .subscribe((data) => (this.bookings = data));
  };

  onChange = (event: any) => {
    this.email = event.target.value;
  };
}
