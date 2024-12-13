import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SignupModel } from '../models/signup-model';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage: string = '';
  selectedDate: Date | null = null;
  @ViewChild(MatDatepicker) datepicker?: MatDatepicker<Date>;

  openDatepicker() {
    this.datepicker?.open();
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm() {
    try {
      this.signupForm = this.fb.group(
        {
          name: ['', [Validators.required, Validators.minLength(3)]],
          email: ['', [Validators.required, Validators.email]],
          dob: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
        },
        { validators: this.passwordMatcher }
      );
    } catch (error) {
      throw error;
    }
  }

  passwordMatcher(group: FormGroup): { [key: string]: boolean } | null {
    try {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    } catch (error) {
      throw error;
    }
  }

  // Get form controls
  get f() {
    return this.signupForm.controls;
  }

  // Submit handler
  onSubmit(): void {
    try {
      if (this.signupForm.invalid) {
        return;
      }

      const signupData: SignupModel = {
        name: this.f['name'].value,
        email: this.f['email'].value,
        dob: this.f['dob'].value,
        password: this.f['password'].value,
        confirmPassword: this.f['confirmPassword'].value,
      };

      this.authService.signup(signupData).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage =
            'Failed to sign up. Please try again. Error: ' + err.error;
        },
      });
    } catch (error) {}
  }
}
