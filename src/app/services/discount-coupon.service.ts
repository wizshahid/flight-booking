import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscountCouponModel } from '../models/discount-coupon.model';
import { apiUrl, apiUrls } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class DiscountCouponService {
  constructor(private httpClient: HttpClient) {}

  postCoupon = (
    model: DiscountCouponModel
  ): Observable<DiscountCouponModel> => {
    return this.httpClient.post<DiscountCouponModel>(
      apiUrl + apiUrls.discountCoupon,
      model
    );
  };

  getCoupons = (): Observable<DiscountCouponModel[]> => {
    return this.httpClient.get<DiscountCouponModel[]>(
      apiUrl + apiUrls.discountCoupon
    );
  };

  getCouponByCode = (code: string): Observable<DiscountCouponModel> => {
    return this.httpClient.get<DiscountCouponModel>(
      apiUrl + apiUrls.discountCoupon + '/code/' + code
    );
  };
}
