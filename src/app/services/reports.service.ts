import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AirlineModel } from '../models/airlineModel';
import { BookingResponse } from '../models/bookRequest';
import { apiUrl, apiUrls, getAdminHeader } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private httpClient: HttpClient) {}

  getAirlines = (): Observable<AirlineModel[]> => {
    return this.httpClient.get<AirlineModel[]>(
      apiUrl + apiUrls.airlines + `?fetchOnlyActive=${false}`,
      {
        headers: getAdminHeader(),
      }
    );
  };

  getBookings = (): Observable<BookingResponse[]> => {
    return this.httpClient.get<BookingResponse[]>(
      apiUrl + apiUrls.getAllBookings,
      {
        headers: getAdminHeader(),
      }
    );
  };
}
