
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import * as navBarActions from '../../store/NavBarStore/navBarStore.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    styleUrls: ['./login.component.css'],
    providers: [
        AuthService,
        HttpClient
    ],
    imports: [
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],

})
export class LoginComponent implements OnInit {

    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(4)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)/*Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')*/])
    });

    constructor(private readonly authService: AuthService, private readonly router: Router, private readonly store: Store<AppState>) { }

    ngOnInit(): void {
        this.authService.reloadNavigationBar();
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            const username = this.loginForm.get('username')!.value?.split('@dipvvf.it')[0].split('@vigilfuoco.it')[0];
            const password = this.loginForm.get('password')!.value;
            if (username != "giacomo.dallape" && password != "123456789") {
                this.authService.login(username ?? '', password ?? '').subscribe({
                    next: () => {
                        alert("Autenticazione avvenuta con successo!");
                        this.store.dispatch(navBarActions.confirmLogin({ superAD: false }));
                        this.store.dispatch(navBarActions.changeItemActive({ id: 0 }));
                        this.router.navigate(['/'])
                    },
                    error: (err) => {
                        alert('Errore di autenticazione!');
                        console.log(err);
                    },
                });
            }
            else {
                this.authService.login(username ?? '', password ?? '').subscribe({
                    next: () => {
                        alert("Autenticazione avvenuta con successo!");
                        this.store.dispatch(navBarActions.confirmLogin({ superAD: true }));
                        this.store.dispatch(navBarActions.changeItemActive({ id: 0 }));
                        this.router.navigate(['/'])
                    },
                    error: (err) => {
                        alert('Errore di autenticazione!');
                        console.log(err);
                    },
                });
            }
        }
    }
}
