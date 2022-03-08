import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
})
export class UserNavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  isLoggedIn = () => {
    return this.authService.isLoggedIn();
  };

  onLogout = () => {
    this.authService.logOut();
    this.router.navigate(['/user/login']);
  };
}
