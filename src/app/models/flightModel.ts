export interface FlightModel {
  airlineName: string;
  date: Date;
  flightNumber: string;
  fromPlace: string;
  inventoryId: string;
  price: number;
  toPlace: string;
  logoPath: string;
  flightType: string;
}

export interface FlightList {
  outboundFlights: FlightModel[];
  returnFlights: FlightModel[];
}
