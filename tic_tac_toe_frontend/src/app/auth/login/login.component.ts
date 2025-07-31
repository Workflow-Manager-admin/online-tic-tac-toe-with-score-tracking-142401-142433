import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, NgIf],
})
/** LoginComponent presents the login form and handles user authentication. */
export class LoginComponent {
  errorMsg: string | null = null;
  loading = false;
  loginForm;

  constructor(fb: FormBuilder, auth: AuthService, router: Router) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this._auth = auth;
    this._router = router;
  }

  private _auth: AuthService;
  private _router: Router;

  // PUBLIC_INTERFACE
  async onSubmit() {
    if (this.loginForm.invalid) return;
    this.errorMsg = null;
    this.loading = true;
    try {
      await this._auth.login(
        this.loginForm.value.username!,
        this.loginForm.value.password!
      );
      this._router.navigate(['/game']);
    } catch (err: any) {
      this.errorMsg = err?.error?.detail || 'Login failed. Please try again.';
    }
    this.loading = false;
  }
}
