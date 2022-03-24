import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
})
export class AdminLoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {}

  returnUrl: string = '';
  submitted = false;
  submitting = false;
  ngOnInit(): void {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] || 'admin/airlines';
  }

  onSubmit() {
    this.submitted = true;
    this.submitting = true;
    if (this.loginForm.valid)
      this.authService.adminLogin(this.loginForm.value).subscribe({
        next: (data: any) => {
          localStorage['fb_admin_token'] = data.token;
          this.router.navigate([this.returnUrl]);
        },
        error: (e) => {
          this.submitting = false;
          this.messageService.handleError(e);
        },
      });
  }
}
