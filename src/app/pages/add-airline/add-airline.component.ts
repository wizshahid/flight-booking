import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AirlineService } from 'src/app/services/airline.service';

@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
})
export class AddAirlineComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private airlineService: AirlineService,
    private router: Router
  ) {}

  airlineForm = this.formBuilder.group({
    name: '',
    contactAddress: '',
    contactNo: '',
    file: '',
    dfile: '',
  });

  ngOnInit(): void {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.airlineForm.patchValue({
        file,
      });
    }
  }

  onSubmit = () => {
    const formData = this.toFormData(this.airlineForm.value);

    this.airlineService.addAirline(formData).subscribe({
      next: (data) => {
        this.router.navigate(['/admin/airlines']);
      },
      error: (err) => {
        alert(err.error);
      },
    });
  };

  toFormData(formValue: any) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }
}
