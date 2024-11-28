import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/login.service';
import { AppState } from '../../store/states/app.state';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import * as navBarActions from '../../store/NavBarStore/navBarStore.actions';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'vvfrubrica-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {

  constructor(private readonly _authService: AuthService, private readonly authService: AuthService, private readonly router: Router, private readonly store: Store<AppState>, private readonly location: Location) { }

  ngOnInit() {
    this._authService.logout();
    this.store.dispatch(navBarActions.confirmLogout());
    this._authService.reloadNavigationBar();
  }

}
