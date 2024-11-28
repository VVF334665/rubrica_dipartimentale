
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AppState } from '../store/states/app.state';
import { Store } from '@ngrx/store';
import { SetAuthToken } from '../store/actions/authuser.action';
import { Location } from '@angular/common';
import * as navBarActions from '../store/NavBarStore/navBarStore.actions';


interface AuthResponse {
    token: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    // private apiUrl = 'http://localhost:5298/api/Auth/'; // URL del server per l'autenticazione
    private readonly apiUrl = environment.apiCreateToken;
    private readonly isLoggedInSubject = new BehaviorSubject<boolean>(false);

    constructor(private readonly http: HttpClient, private readonly router: Router, private readonly store: Store<AppState>, private readonly location: Location) {
        // Verifica se l'utente è già loggato all'avvio dell'app
        this.isLoggedInSubject.next(!!this.getToken());
    }

    login(username: string, password: string): Observable<AuthResponse> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify({ username, password });
        //return this.http.post<AuthResponse>(this.apiUrl + 'people', body, { 'headers': headers })

        return this.http
            // .post<AuthResponse>(`${this.apiUrl}Token/Create`, { username, password })
            // .post<AuthResponse>(`${this.apiUrl}`, body, { 'headers': headers })
            .get<AuthResponse>(`${this.apiUrl}`)
            .pipe(
                tap((response) => {
                    this.saveToken(response.token);
                    //this.isLoggedInSubject.next(true);
                    // console.log("sono auth service");
                    // console.log(response.token);
                })
            );
    }

    logout(): void {
        this.removeToken();
        this.isLoggedInSubject.next(false);
        this.router.navigate(['/login']);
    }

    saveToken(token: string): void {
        this.store.dispatch(SetAuthToken({ token: token }));
        // localStorage.setItem('authToken', token);
    }

    getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    removeToken(): void {
        localStorage.removeItem('authToken');
    }

    isLoggedIn(): Observable<boolean> {
        return this.isLoggedInSubject.asObservable();
    }

    reloadNavigationBar() {
        let flgUnsubscribe: boolean = true;
        this.router.events
            .pipe(takeWhile(() => flgUnsubscribe))
            .subscribe((val) => {
                if (val instanceof NavigationEnd) {
                    this.store.dispatch(navBarActions.fixReloadPage({ pathRouter: this.location.path(false) }));
                    flgUnsubscribe = false
                }
            })
    }
}
