import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SedeComponent } from './components/sede/sede.component';
import { TestbeComponent } from './components/testbe/testbe.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "sedi", component: SedeComponent },
    { path: "testbe", component: TestbeComponent },
    { path: "login", component: LoginComponent},
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
