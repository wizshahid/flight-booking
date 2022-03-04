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
  booking: '/api/v1.0/flight/booking/',
  getBooking: '/api/v1.0/flight/ticket/',
  getBookingByEmail: '/api/v1.0/flight/booking/history/',
  cancelBooking: '/api/v1.0/flight/booking/cancel/',
};
