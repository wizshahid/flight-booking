import { Gender, Meals } from './enums/enums';

export interface BookRequest {
  name: string;
  email: string;
  flightId: string;
  noOfSeats: number;
  meals: Meals;
  date: Date;
  bookingDetails: BookDetails[];
}

export interface BookDetails {
  name: string;
  gender: Gender;
  age: number;
  seatNumber: number;
}

export interface BookingResponse extends BookRequest {
  id: string;
  fromPlace: string;
  toPlace: string;
  userId: string;
  airlineName: string;
  flightNumber: string;
  price: number;
  logoPath: string;
}
