import { HttpHeaders } from '@angular/common/http';
import { BookingResponse } from '../models/bookRequest';

export const apiUrl: string = 'http://localhost:52476';

export const apiUrls = {
  userLogin: '/api/v1.0/flight/user/login',
  userRegister: '/api/v1.0/flight/user/register',
  adminLogin: '/api/v1.0/flight/admin/login',
  airlineRegister: '/api/v1.0/flight/airline/register',
  airports: '/api/v1.0/flight/airports',
  addInventory: '/api/v1.0/flight/airline/inventory/add',
  airlines: '/api/v1.0/flight/airlines',
  changeAirlineStatus: '/api/v1.0/flight/airlines/changestatus/',
  flightSearch: '/api/v1.0/flight/search',
  flight: '/api/v1.0/flight/',
  booking: '/api/v1.0/flight/booking',
  getBooking: '/api/v1.0/flight/ticket/',
  getBookingByEmail: '/api/v1.0/flight/booking/history',
  getAllBookings: '/api/v1.0/flight/booking/all',
  cancelBooking: '/api/v1.0/flight/booking/cancel/',
  discountCoupon: '/api/v1.0/discountCoupon',
};

export const getAdminHeader = () => {
  let headers = new HttpHeaders();
  headers = headers.set(
    'Authorization',
    'Bearer ' + localStorage['fb_admin_token']
  );
  return headers;
};

export const getHeader = () => {
  let headers = new HttpHeaders();
  headers = headers.set(
    'Authorization',
    'Bearer ' + localStorage['fb_user_token']
  );
  return headers;
};

export const getPrice = (booking: BookingResponse) => {
  return (
    (booking.outBoundFlight.price + (booking.returnFlight?.price || 0)) *
    booking.noOfSeats
  );
};

export const getDiscountAmount = (booking: BookingResponse) => {
  return (getPrice(booking) * booking.discountPercent) / 100;
};

export const getFinalAmount = (booking: BookingResponse) => {
  return getPrice(booking) - getDiscountAmount(booking);
};
