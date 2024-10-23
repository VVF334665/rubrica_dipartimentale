import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLandmark, faBuilding, faUser as faUserSolid } from '@fortawesome/free-solid-svg-icons';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ItemButtonBarComponent } from "../item-button-bar/item-button-bar.component";
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/states/app.state';
import { ItemNavBar } from '../../../store/Interface_store/ItemNavBar';
import * as navBarStoreSelectors from '../../../store/NavBarStore/navBarStore.selectors';

@Component({
    selector: 'vvfrubrica-side-bar',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatToolbarModule, MatButtonModule, FontAwesomeModule, RouterLink, RouterLinkActive, ItemButtonBarComponent],
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

    constructor(public store: Store<AppState>) {}

    allData: Observable<ItemNavBar[]> = this.store.select(navBarStoreSelectors.getItemNavBar);

    faLandmark = faLandmark;
    faBuilding = faBuilding;
    faUserRegular = faUserRegular;
    faUserSolid = faUserSolid;
}
