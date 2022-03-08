import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private toastService: ToastrService) {}

  handleError = (data: HttpErrorResponse) => {
    var errors = data.error;
    var message = '';
    if (typeof errors === 'string') {
      message = errors;
    } else if (errors instanceof Array) {
      errors.forEach((error) => (message += error.message + '\n'));
    }
    this.toastService.error(message);
  };
}
