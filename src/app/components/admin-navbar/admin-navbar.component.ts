import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
})
export class AdminNavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  isAdminLoggedIn = () => {
    return this.authService.isAdminLoggedIn();
  };

  onAdminLogout = () => {
    this.authService.adminLogOut();
    this.router.navigate(['/admin/login']);
  };
}
