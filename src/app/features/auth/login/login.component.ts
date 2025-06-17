import { Component } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login, LoginForm } from '../shared/types';
import { LoginService } from '../shared/login.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected loginForm!: FormGroup<LoginForm>;

  constructor(
    public router: Router,
    private fb: NonNullableFormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  async signIn(e: Event) {
    e.preventDefault()
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const formData = this.loginForm.value;
    try {
      const login = await this.loginService.login(formData as Login);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error(error)
    }
  }
}
