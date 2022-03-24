import { Gender, Meals } from './enums/enums';

export interface BookRequest {
  name: string;
  email: string;
  outBoundFlightId: string;
  returnFlightId: string;
  noOfSeats: number;
  meals: Meals;
  returnMeals: Meals;
  date: Date;
  returnDate: Date;
  flightType: string;
  couponCode: string;
  bookingDetails: BookDetails[];
}

export interface BookDetails {
  name: string;
  gender: Gender;
  age: number;
  seatNumber: number;
}

export interface BookingResponse {
  name: string;
  email: string;
  noOfSeats: number;
  bookingDetails: BookDetails[];
  id: string;
  fromPlace: string;
  toPlace: string;
  userId: string;
  status: string;
  flightType: string;
  outBoundFlight: FlightDetails;
  returnFlight: FlightDetails | null;
  discountPercent: number;
}

export interface FlightDetails {
  airlineName: string;
  flightNumber: string;
  price: number;
  logoPath: string;
  date: Date;
  meals: Meals;
}
