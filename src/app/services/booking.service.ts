import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingResponse, BookRequest } from '../models/bookRequest';
import { apiUrl, apiUrls } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private httpClient: HttpClient) {}

  bookFlight = (model: BookRequest): Observable<BookingResponse> => {
    return this.httpClient.post<BookingResponse>(
      apiUrl + apiUrls.booking + model.flightId,
      model,
      {
        headers: this.getHeader(),
      }
    );
  };

  getBookingDetails = (id: string): Observable<BookingResponse> => {
    return this.httpClient.get<BookingResponse>(
      apiUrl + apiUrls.getBooking + id,
      { headers: this.getHeader() }
    );
  };

  getHeader = () => {
    let headers = new HttpHeaders();
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage['fb_user_token']
    );
    return headers;
  };
}
