import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ItemButtonBarComponent } from "../item-button-bar/item-button-bar.component";
import { CommonModule, Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/states/app.state';
import { ItemNavBar } from '../../../store/Interface_store/ItemNavBar';
import * as navBarStoreSelectors from '../../../store/NavBarStore/navBarStore.selectors';
import { AuthService } from '../../../services/login.service';

@Component({
    selector: 'vvfrubrica-side-bar',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatToolbarModule, MatButtonModule, FontAwesomeModule, ItemButtonBarComponent],
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {

    constructor(public store: Store<AppState>, private readonly authService: AuthService, private readonly location: Location, private router: Router) {
    }

    ngOnInit(): void {
        this.authService.reloadNavigationBar();
    }

    allData: Observable<ItemNavBar[]> = this.store.select(navBarStoreSelectors.getItemNavBar);

}
