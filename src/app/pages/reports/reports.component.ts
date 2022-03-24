import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AirlineModel } from 'src/app/models/airlineModel';
import { BookingResponse } from 'src/app/models/bookRequest';
import { ReportsService } from 'src/app/services/reports.service';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
})
export class ReportsComponent implements OnInit {
  airlines: AirlineModel[] = [];
  bookings: BookingResponse[] = [];
  constructor(
    private reportsService: ReportsService,
    private pdfService: PdfService
  ) {}
  module = 'Airlines';
  fetched = false;

  onModuleChange = () => {
    if (!this.fetched && this.module === 'Bookings') {
      this.reportsService
        .getBookings()
        .subscribe((data) => (this.bookings = data));
      this.fetched = true;
    }
  };

  ngOnInit(): void {
    this.reportsService
      .getAirlines()
      .subscribe((data) => (this.airlines = data));
  }

  public SavePDF(content: any): void {
    this.pdfService.SavePDF(content, 'reports.pdf');
  }
}
