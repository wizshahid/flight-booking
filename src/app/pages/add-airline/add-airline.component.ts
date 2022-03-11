import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AirlineService } from 'src/app/services/airline.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
})
export class AddAirlineComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private airlineService: AirlineService,
    private router: Router,
    private messageService: MessageService
  ) {}

  airlineForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    contactAddress: '',
    contactNo: '',
    file: '',
    dfile: new FormControl('', Validators.required),
  });

  submitted = false;

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
    this.submitted = true;
    if (this.airlineForm.valid) {
      const formData = this.toFormData(this.airlineForm.value);
      this.airlineService.addAirline(formData).subscribe({
        next: () => {
          this.router.navigate(['/admin/airlines']);
        },
        error: this.messageService.handleError,
      });
    }
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
