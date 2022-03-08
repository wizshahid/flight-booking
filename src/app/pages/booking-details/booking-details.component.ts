import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingResponse, BookDetails } from 'src/app/models/bookRequest';
import { Meals } from 'src/app/models/enums/enums';
import { BookingService } from 'src/app/services/booking.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
})
export class BookingDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private toastService: ToastrService,
    private messageService: MessageService,
    private router: Router
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
    status: '',
  };
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') || '';
      this.bookingService.getBookingDetails(this.id).subscribe((data) => {
        this.booking = data;
      });
    });
  }

  cancelBooking = () => {
    this.bookingService.cancelBookings(this.id).subscribe({
      next: (data) => {
        this.booking.status = 'Cancel';
        this.toastService.success('Booking Cancelled Successfully');
        this.router.navigate(['user/flight/bookings']);
      },
      error: this.messageService.handleError,
    });
  };
}
