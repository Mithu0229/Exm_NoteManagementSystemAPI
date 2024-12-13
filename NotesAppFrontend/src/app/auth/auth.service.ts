import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';  

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + 'auth';  

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          const decodedToken = this.jwtHelper.decodeToken(response.token);
          debugger;
          const username = decodedToken.sub; 
          localStorage.setItem('username', username); 
        } else {
          console.error('Invalid token received from server');
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getUsername(): string | null {
    return localStorage.getItem('username'); // Retrieve username from localStorage
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Remove username on logout
  }
}
