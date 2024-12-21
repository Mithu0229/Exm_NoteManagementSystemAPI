
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedInUser: string | null = null;
  isLoggedIn=false;
  username: any ='';
  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit() {debugger
    // Subscribe to the user authentication status
    if (this.authService.isAuthenticated()) {
      this.loggedInUser = this.authService.getUsername();
    }

  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.loggedInUser = null; // Clear the user data on logout
    this.router.navigate(['/login']);
  }

  home():void{
    if(this.isAuthenticated()){
      this.router.navigate(['/dashboard']);
      window.location.reload();
    }
  }
}
