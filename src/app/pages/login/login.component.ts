import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {}

  returnUrl: string = '';
  ngOnInit(): void {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] || '/user/search';
  }

  onSubmit() {
    console.log();
    this.authService.login(this.loginForm.value).subscribe({
      next: (data: any) => {
        localStorage['fb_user_token'] = data.token;
        this.router.navigate([this.returnUrl]);
      },
      error: this.messageService.handleError,
    });
  }
}
