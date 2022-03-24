import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SearchFlightComponent } from './pages/search-flight/search-flight.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AuthGuard } from './security/auth-guard';
import { AddAirlineComponent } from './pages/add-airline/add-airline.component';
import { AdminAuthGuard } from './security/admin-auth-guard';
import { AirlinesComponent } from './pages/airlines/airlines.component';
import { AddInventoryComponent } from './pages/add-inventory/add-inventory.component';
import { AirlineDetailsComponent } from './pages/airline-details/airline-details.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './pages/user-layout/user-layout.component';
import { BookFlightComponent } from './pages/book-flight/book-flight.component';
import { BookingDetailsComponent } from './pages/booking-details/booking-details.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { RegisterComponent } from './pages/register/register.component';
import { DiscountCouponComponent } from './pages/dicount-coupon/discount-coupon.component';
import { ReportsComponent } from './pages/reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: 'user/home', pathMatch: 'full' },
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'search', component: SearchFlightComponent },
      {
        path: 'flight/book',
        component: BookFlightComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'flight/booking/:id',
        component: BookingDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'flight/bookings',
        component: MyBookingsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'airlines',
        component: AirlinesComponent,
        canActivate: [AdminAuthGuard],
      },
      {
        path: 'coupons',
        component: DiscountCouponComponent,
        canActivate: [AdminAuthGuard],
      },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [AdminAuthGuard],
      },
      {
        path: 'airlines/inventory',
        component: AddInventoryComponent,
        canActivate: [AdminAuthGuard],
      },
      {
        path: 'airlines/add',
        component: AddAirlineComponent,
        canActivate: [AdminAuthGuard],
      },
      {
        path: 'airlines/:id',
        component: AirlineDetailsComponent,
        canActivate: [AdminAuthGuard],
      },
      { path: 'login', component: AdminLoginComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  LoginComponent,
  PageNotFoundComponent,
  HomeComponent,
  SearchFlightComponent,
  AdminLoginComponent,
  AddAirlineComponent,
  AirlinesComponent,
  AddInventoryComponent,
  AirlineDetailsComponent,
  AdminLayoutComponent,
  UserLayoutComponent,
  BookFlightComponent,
  BookingDetailsComponent,
  MyBookingsComponent,
  RegisterComponent,
  DiscountCouponComponent,
  ReportsComponent,
];
