import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './security/auth-guard';
import { AdminAuthGuard } from './security/admin-auth-guard';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AdminNavbarComponent,
    UserNavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard, AdminAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
