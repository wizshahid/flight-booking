import { Pipe, PipeTransform } from '@angular/core';
import { BookingResponse } from '../models/bookRequest';
import { getPrice } from '../utils/constants';

@Pipe({
  name: 'amount',
})
export class AmountPipe implements PipeTransform {
  transform(booking: BookingResponse): string {
    return '$' + getPrice(booking);
  }
}
