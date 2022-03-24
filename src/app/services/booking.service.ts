import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingResponse, BookRequest } from '../models/bookRequest';
import { apiUrl, apiUrls, getHeader } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private httpClient: HttpClient) {}

  bookFlight = (model: BookRequest): Observable<BookingResponse> => {
    return this.httpClient.post<BookingResponse>(
      apiUrl + apiUrls.booking,
      model,
      {
        headers: getHeader(),
      }
    );
  };

  getBookingDetails = (id: string): Observable<BookingResponse> => {
    return this.httpClient.get<BookingResponse>(
      apiUrl + apiUrls.getBooking + id,
      { headers: getHeader() }
    );
  };

  getMyBookings = (email: string): Observable<BookingResponse[]> => {
    return this.httpClient.get<BookingResponse[]>(
      apiUrl + apiUrls.getBookingByEmail + '?emailId=' + email,
      {
        headers: getHeader(),
      }
    );
  };

  cancelBookings = (pnr: string) => {
    return this.httpClient.delete(apiUrl + apiUrls.cancelBooking + pnr, {
      headers: getHeader(),
    });
  };
}
