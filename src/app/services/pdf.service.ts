import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  public SavePDF(content: any, fileName = 'flight-booking.pdf'): void {
    // let doc = new jsPDF('l', 'cm', 'a4');

    // doc.html(content.innerHTML, {
    //   callback: function (pdf) {
    //     pdf.save('report.pdf');
    //   },
    // });

    html2canvas(content).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(fileName);
    });
  }
}
