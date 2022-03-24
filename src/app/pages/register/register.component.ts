import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm = this.formBuilder.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private toastrService: ToastrService
  ) {}

  submitted = false;
  submitting = false;
  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.submitting = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.toastrService.success('Account created successfully');
          this.submitting = false;
        },
        error: (e) => {
          this.submitting = false;
          this.messageService.handleError(e);
        },
      });
    }
  }
}
