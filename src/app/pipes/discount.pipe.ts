import { Pipe, PipeTransform } from '@angular/core';
import { BookingResponse } from '../models/bookRequest';
import { getDiscountAmount } from '../utils/constants';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  transform(booking: BookingResponse): string {
    return '$' + getDiscountAmount(booking);
  }
}
