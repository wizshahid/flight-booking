import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './security/auth-guard';
import { AdminAuthGuard } from './security/admin-auth-guard';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { ValidatorComponent } from './components/validator/validator.component';
import { DiscountPipe } from './pipes/discount.pipe';
import { AmountPipe } from './pipes/amount.pipe';
import { FinalAmountPipe } from './pipes/final-amount.pipe';
import { AirlineHeaderComponent } from './components/airline-header/airline-header.component';
import { AirlineBodyComponent } from './components/airline-body/airline-body.component';
import { LoaderButtonComponent } from './components/loader-button/loader-button.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AdminNavbarComponent,
    UserNavbarComponent,
    ValidatorComponent,
    DiscountPipe,
    AmountPipe,
    FinalAmountPipe,
    AirlineHeaderComponent,
    AirlineBodyComponent,
    LoaderButtonComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthGuard, AdminAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
