import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, NgIf],
})
/** RegisterComponent presents the registration form for new users. */
export class RegisterComponent {
  errorMsg: string | null = null;
  loading = false;
  registerForm;

  constructor(fb: FormBuilder, auth: AuthService, router: Router) {
    this.registerForm = fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
    });
    this._auth = auth;
    this._router = router;
  }

  private _auth: AuthService;
  private _router: Router;

  // PUBLIC_INTERFACE
  async onSubmit() {
    if (this.registerForm.invalid) return;
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.errorMsg = 'Passwords do not match';
      return;
    }
    this.errorMsg = null;
    this.loading = true;
    try {
      await this._auth.register(
        this.registerForm.value.username!,
        this.registerForm.value.password!
      );
      this._router.navigate(['/login']);
    } catch (err: any) {
      this.errorMsg = err?.error?.detail || 'Registration failed. Please try again.';
    }
    this.loading = false;
  }
}
