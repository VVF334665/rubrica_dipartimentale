import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLandmark, faBuilding, faUser as faUserSolid } from '@fortawesome/free-solid-svg-icons';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ItemButtonBarComponent } from "../item-button-bar/item-button-bar.component";
import { CommonModule, Location } from '@angular/common';
import { Observable, takeWhile } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/states/app.state';
import { ItemNavBar } from '../../../store/Interface_store/ItemNavBar';
import * as navBarStoreSelectors from '../../../store/NavBarStore/navBarStore.selectors';
import * as navBarStoreActions from '../../../store/NavBarStore/navBarStore.actions';

@Component({
    selector: 'vvfrubrica-side-bar',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatToolbarModule, MatButtonModule, FontAwesomeModule, ItemButtonBarComponent],
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {

    constructor(public store: Store<AppState>, private readonly location: Location, private router: Router) {
    }

    ngOnInit(): void {
        // questo serve per correggere la selezione della navbar sul giusto button
        let flgUnsubscribe: boolean = true;
        this.router.events
            .pipe(takeWhile(value => flgUnsubscribe))
            .subscribe((val) => {
                if (val instanceof NavigationEnd) {
                    this.store.dispatch(navBarStoreActions.fixReloadPage({ pathRouter: this.location.path(false) }));
                    flgUnsubscribe = false
                }
            })
    }

    allData: Observable<ItemNavBar[]> = this.store.select(navBarStoreSelectors.getItemNavBar);
    
}
