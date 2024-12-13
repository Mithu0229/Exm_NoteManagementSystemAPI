import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'; 
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateNoteComponent } from './notes/create-note/create-note.component';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { TokenInterceptor } from 'src/core/interceptors/token.interceptor';
import { TimeLeftPipe } from 'src/core/pipes/time-left.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => localStorage.getItem('token'), 
    allowedDomains: environment.allowedDomains, 
    disallowedRoutes: environment.disallowedRoutes  
  };
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    CreateNoteComponent,
    NoteListComponent,
    TimeLeftPipe
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    MatNativeDateModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
     JwtHelperService,
    {
      provide: JWT_OPTIONS,
      useFactory: jwtOptionsFactory
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
