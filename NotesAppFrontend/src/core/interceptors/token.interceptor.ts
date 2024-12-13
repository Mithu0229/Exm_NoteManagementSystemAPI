import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else if (token && this.jwtHelper.isTokenExpired(token)) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return throwError(() => new Error('Token expired, user logged out.'));
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 ||error.status === 403) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }

        if (error.status === 500) {
          alert('An error occurred on the server. Please try again later.');
        } else if (error.status === 0) {
          alert('Network error. Please check your connection.');
        } else {
          alert('An unexpected error occurred. Please try again.');
        }

        return throwError(() => error);
      })
    );
  }
}
