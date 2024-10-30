
import { Component } from '@angular/core';
import { AuthService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css'],
  providers: [
    AuthService
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],

})
export class LoginComponent {
  
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    // private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // this.loginForm = this.fb.group({
    //   username: ['', [Validators.required, Validators.required]],
    //   password: ['', Validators.required],
    // });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // const { username, password } = this.loginForm.value;
      const username = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;
      this.authService.login(username ?? '', password ?? '').subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => alert('Errore di autenticazione!'),
      });
    }
  }
}
