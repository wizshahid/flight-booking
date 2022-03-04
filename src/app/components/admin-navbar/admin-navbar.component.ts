import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
})
export class AdminNavbarComponent implements OnInit {
  isAdminLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAdminLoggedIn = this.authService.isAdminLoggedIn();
  }

  onAdminLogout = () => {
    this.authService.adminLogOut();
    this.router.navigate(['/admin/login']);
  };
}
