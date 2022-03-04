import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AirlineDetails } from 'src/app/models/airlineModel';
import { AirlineStatus } from 'src/app/models/enums/enums';
import { AirlineService } from 'src/app/services/airline.service';

@Component({
  selector: 'app-airline-details',
  templateUrl: './airline-details.component.html',
})
export class AirlineDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private airlineService: AirlineService
  ) {}
  id: string = '';
  airlineDetails: AirlineDetails = {
    id: '',
    contactAddress: '',
    contactNo: '',
    inventories: [],
    logoPath: '',
    name: '',
    file: '',
    status: AirlineStatus.Active,
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') || '';
      this.airlineService.getAirlineDetails(this.id).subscribe((data) => {
        this.airlineDetails = data;
      });
    });
  }

  onChangeStatus = () => {
    let status =
      this.airlineDetails?.status == AirlineStatus.Active
        ? AirlineStatus.InActive
        : AirlineStatus.Active;

    this.airlineService
      .changeAirlineStatus(this.airlineDetails?.id || '', status)
      .subscribe((data) => {
        alert('Status changed successfully');
        this.airlineDetails.status = data.status;
      });
  };
}
