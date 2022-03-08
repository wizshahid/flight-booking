import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
})
export class AdminLoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  returnUrl: string = '';
  ngOnInit(): void {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] || 'admin/airlines';
  }

  onSubmit() {
    console.log();
    this.authService.adminLogin(this.loginForm.value).subscribe({
      next: (data: any) => {
        localStorage['fb_admin_token'] = data.token;
        this.router.navigate([this.returnUrl]);
      },
      error: (err) => alert(err.error),
    });
  }
}
