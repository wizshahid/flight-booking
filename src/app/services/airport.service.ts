import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Airport } from '../models/airport';
import { apiUrl, apiUrls } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  constructor(private http: HttpClient) {}

  getAirports = (): Observable<Airport[]> => {
    return this.http.get<Airport[]>(apiUrl + apiUrls.airports);
  };
}
