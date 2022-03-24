import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AirlineInventory } from '../models/airlineInventory';
import { AirlineDetails, AirlineModel } from '../models/airlineModel';
import { AirlineSearchModel } from '../models/airlineSearchModel';
import { AirlineStatus } from '../models/enums/enums';
import { FlightList, FlightModel } from '../models/flightModel';
import { apiUrl, apiUrls, getAdminHeader } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class AirlineService {
  constructor(private httpClient: HttpClient) {}

  searchFlight = (model: AirlineSearchModel): Observable<FlightList> => {
    return this.httpClient.post<FlightList>(
      apiUrl + apiUrls.flightSearch,
      model
    );
  };

  getFlight = (id: string): Observable<FlightModel> => {
    return this.httpClient.get<FlightModel>(apiUrl + apiUrls.flight + id);
  };

  addAirline = (model: FormData): Observable<AirlineModel[]> => {
    console.log(model);
    return this.httpClient.post<AirlineModel[]>(
      apiUrl + apiUrls.airlineRegister,
      model,
      { headers: getAdminHeader() }
    );
  };

  changeAirlineStatus = (
    id: string,
    status: AirlineStatus
  ): Observable<AirlineModel> => {
    return this.httpClient.put<AirlineModel>(
      apiUrl + apiUrls.changeAirlineStatus + id + '/' + status,
      {},
      { headers: getAdminHeader() }
    );
  };

  addInventory = (model: AirlineInventory): Observable<AirlineInventory> => {
    return this.httpClient.post<AirlineInventory>(
      apiUrl + apiUrls.addInventory,
      model,
      { headers: getAdminHeader() }
    );
  };

  getAirlines = (fetchOnlyActive: boolean): Observable<AirlineModel[]> => {
    return this.httpClient.get<AirlineModel[]>(
      apiUrl + apiUrls.airlines + `?fetchOnlyActive=${fetchOnlyActive}`,
      {
        headers: getAdminHeader(),
      }
    );
  };

  getAirlineDetails = (id: string): Observable<AirlineDetails> => {
    return this.httpClient.get<AirlineDetails>(
      apiUrl + apiUrls.airlines + '/' + id,
      {
        headers: getAdminHeader(),
      }
    );
  };
}
