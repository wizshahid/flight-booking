import { Pipe, PipeTransform } from '@angular/core';
import { BookingResponse } from '../models/bookRequest';
import { getFinalAmount } from '../utils/constants';

@Pipe({
  name: 'finalAmount',
})
export class FinalAmountPipe implements PipeTransform {
  transform(booking: BookingResponse): string {
    return '$' + getFinalAmount(booking);
  }
}
