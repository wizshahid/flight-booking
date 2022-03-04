import { Meals, ScheduledDays } from './enums/enums';

export interface AirlineInventory {
  id: string;
  airlineId: string;
  flightNumber: string;
  fromPlaceId: string;
  toPlaceId: string;
  startDate: Date;
  endDate: Date;
  scheduledDays: ScheduledDays;
  instrumentUsed: string;
  businessClassSeats: number;
  nonBusinessClassSeats: number;
  ticketPrice: number;
  numberOfRows: number;
  meals: Meals;
}

export interface InventoryDetails extends AirlineInventory {
  fromPlace: string;
  toPlace: string;
}
